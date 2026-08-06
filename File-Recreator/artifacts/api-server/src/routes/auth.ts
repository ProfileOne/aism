import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { delegatesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import type { AuthRequest } from "../middlewares/auth";

const router: IRouter = Router();

// Master admin credentials from environment variables
const MASTER_ADMIN_ID = process.env.MASTER_ADMIN_ID || "admin";
const MASTER_ADMIN_PASSWORD = process.env.MASTER_ADMIN_PASSWORD || "admin123";

// Normalize phone number (remove spaces, dashes, parentheses)
const normalizePhoneNumber = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, "");
};

// Normalize portfolio (trim, uppercase)
const normalizePortfolio = (portfolio: string): string => {
  return portfolio.trim().toUpperCase();
};

// Delegate login
router.post("/login/delegate", async (req: AuthRequest, res) => {
  try {
    const { portfolio, phoneNumber, email } = req.body;

    // Validate required fields
    if (!portfolio || !phoneNumber) {
      return res.status(400).json({ 
        error: "Portfolio and Phone Number are required" 
      });
    }

    // Normalize inputs
    const normalizedPortfolio = normalizePortfolio(portfolio);
    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    // Search for delegate in database
    const delegate = await db
      .select()
      .from(delegatesTable)
      .where(eq(delegatesTable.portfolio, normalizedPortfolio))
      .limit(1);

    // Check if delegate exists and phone matches
    if (!delegate.length || normalizePhoneNumber(delegate[0].phoneNumber) !== normalizedPhone) {
      return res.status(401).json({ 
        error: "We couldn't verify your details. Please check your Portfolio and Phone Number." 
      });
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

    // Check admin credentials
    if (masterId !== MASTER_ADMIN_ID || password !== MASTER_ADMIN_PASSWORD) {
      return res.status(401).json({ 
        error: "Invalid Master ID or Password" 
      });
    }

    // Create admin session
    req.session.userId = 0; // Special ID for admin
    req.session.userType = "admin";
    req.session.portfolio = "MASTER_ADMIN";

    return res.json({ 
      success: true, 
      userType: "admin" 
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
