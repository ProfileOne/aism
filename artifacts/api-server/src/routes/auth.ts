import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { delegatesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import type { AuthRequest } from "../middlewares/auth";

const router: IRouter = Router();

// Multiple admin credentials
const ADMIN_CREDENTIALS = [
  { id: "dakshwadekar", password: "AISM@0809" },
  { id: "vishwajeetk", password: "AISM@0809" }
];

// Normalize phone number (remove spaces, dashes, parentheses)
const normalizePhoneNumber = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, "");
};

// Normalize portfolio (trim, uppercase)
const normalizePortfolio = (portfolio: string): string => {
  return portfolio.trim().toUpperCase();
};

// Calculate string similarity (Levenshtein distance)
const levenshteinDistance = (str1: string, str2: string): number => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};

// Check if two strings are similar enough (allows typos)
const isSimilarEnough = (str1: string, str2: string, threshold: number = 0.7): boolean => {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return true;
  
  const distance = levenshteinDistance(str1, str2);
  const similarity = 1 - distance / maxLen;
  
  return similarity >= threshold;
};

// Delegate login
router.post("/login/delegate", async (req: AuthRequest, res) => {
  try {
    const { portfolio, phoneNumber, email } = req.body;

    // Validate required fields
    if (!portfolio) {
      return res.status(400).json({ 
        error: "Portfolio is required" 
      });
    }

    // Normalize inputs
    const normalizedPortfolio = normalizePortfolio(portfolio);
    const normalizedPhone = phoneNumber ? normalizePhoneNumber(phoneNumber) : null;

    // First try exact match
    let delegate = await db
      .select()
      .from(delegatesTable)
      .where(eq(delegatesTable.portfolio, normalizedPortfolio))
      .limit(1);

    // If no exact match, try fuzzy matching
    if (!delegate.length) {
      const allDelegates = await db.select().from(delegatesTable);
      
      // Find the most similar portfolio
      let bestMatch = null;
      let bestSimilarity = 0;
      
      for (const del of allDelegates) {
        const similarity = isSimilarEnough(normalizedPortfolio, del.portfolio, 0.6);
        if (similarity > bestSimilarity) {
          bestSimilarity = similarity;
          bestMatch = del;
        }
      }
      
      if (bestMatch && bestSimilarity >= 0.6) {
        delegate = [bestMatch];
      }
    }

    // Check if delegate exists
    if (!delegate.length) {
      return res.status(401).json({ 
        error: "We couldn't verify your details. Please check your Portfolio." 
      });
    }

    // If phone number is provided, validate it matches
    if (normalizedPhone && delegate[0].phoneNumber) {
      if (normalizePhoneNumber(delegate[0].phoneNumber) !== normalizedPhone) {
        return res.status(401).json({ 
          error: "We couldn't verify your details. Please check your Portfolio and Phone Number." 
        });
      }
    }

    // Update email if provided
    if (email && email.trim()) {
      await db
        .update(delegatesTable)
        .set({ email: email.trim() })
        .where(eq(delegatesTable.id, delegate[0].id));
    }

    // Create session
    req.session.userId = delegate[0].id;
    req.session.userType = "delegate";
    req.session.portfolio = delegate[0].portfolio;

    return res.json({ 
      success: true, 
      userType: "delegate",
      portfolio: delegate[0].portfolio 
    });

  } catch (error) {
    console.error("Delegate login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Admin login
router.post("/login/admin", async (req: AuthRequest, res) => {
  try {
    const { masterId, password } = req.body;

    // Validate required fields
    if (!masterId || !password) {
      return res.status(400).json({ 
        error: "Master ID and Password are required" 
      });
    }

    // Check admin credentials against multiple accounts
    const admin = ADMIN_CREDENTIALS.find(
      admin => admin.id === masterId && admin.password === password
    );

    if (!admin) {
      return res.status(401).json({ 
        error: "Invalid Master ID or Password" 
      });
    }

    // Create admin session
    req.session.userId = 0; // Special ID for admin
    req.session.userType = "admin";
    req.session.portfolio = admin.id.toUpperCase();

    return res.json({ 
      success: true, 
      userType: "admin",
      adminId: admin.id
    });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Logout
router.post("/logout", (req: AuthRequest, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    return res.json({ success: true });
  });
});

// Check authentication status
router.get("/status", (req: AuthRequest, res) => {
  if (!req.session.userId) {
    return res.json({ authenticated: false });
  }

  return res.json({ 
    authenticated: true,
    userType: req.session.userType,
    portfolio: req.session.portfolio
  });
});

export default router;
