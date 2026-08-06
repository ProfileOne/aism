import { Request, Response, NextFunction } from "express";

// Extend Express Session type
declare module "express-session" {
  interface SessionData {
    userId?: number;
    userType?: "delegate" | "admin";
    portfolio?: string;
  }
}

export interface AuthRequest extends Request {
  session: {
    userId?: number;
    userType?: "delegate" | "admin";
    portfolio?: string;
  };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.session.userId || req.session.userType !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
