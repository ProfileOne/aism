import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { delegateScoresTable, delegatesTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import type { AuthRequest } from "../middlewares/auth";
import { requireAuth, requireAdmin } from "../middlewares/auth";

const router: IRouter = Router();

// Get all delegate scores
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const scores = await db
      .select({
        delegateId: delegateScoresTable.delegateId,
        day: delegateScoresTable.day,
        attendance: delegateScoresTable.attendance,
        openingStatement: delegateScoresTable.openingStatement,
        chits: delegateScoresTable.chits,
        mod1: delegateScoresTable.mod1,
        mod2: delegateScoresTable.mod2,
        mod3: delegateScoresTable.mod3,
        mod4: delegateScoresTable.mod4,
        lobbying: delegateScoresTable.lobbying,
        solutionPaper: delegateScoresTable.solutionPaper,
        updatedAt: delegateScoresTable.updatedAt,
      })
      .from(delegateScoresTable);

    const scoresMap = scores.reduce((acc, score) => {
      const key = `${score.delegateId}-${score.day}`;
      acc[key] = {
        attendance: score.attendance,
        opening: score.openingStatement ? parseFloat(score.openingStatement) : '',
        chits: score.chits ? parseFloat(score.chits) : '',
        mod1: score.mod1 ? parseFloat(score.mod1) : '',
        mod2: score.mod2 ? parseFloat(score.mod2) : '',
        mod3: score.mod3 ? parseFloat(score.mod3) : '',
        mod4: score.mod4 ? parseFloat(score.mod4) : '',
        lobbying: score.lobbying ? parseFloat(score.lobbying) : '',
        solution: score.solutionPaper ? parseFloat(score.solutionPaper) : '',
      };
      return acc;
    }, {} as Record<string, any>);

    return res.json(scoresMap);
  } catch (error) {
    console.error("Error fetching scores:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update delegate score
router.put("/:delegateId", requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { delegateId } = req.params;
    const {
      day,
      attendance,
      opening,
      chits,
      mod1,
      mod2,
      mod3,
      mod4,
      lobbying,
      solution,
    } = req.body;

    // Validate day parameter
    if (!day || (day !== 'day1' && day !== 'day2')) {
      return res.status(400).json({ error: "Valid day parameter (day1 or day2) is required" });
    }

    // Validate delegate exists
    const delegate = await db
      .select()
      .from(delegatesTable)
      .where(eq(delegatesTable.id, parseInt(delegateId)))
      .limit(1);

    if (!delegate.length) {
      return res.status(404).json({ error: "Delegate not found" });
    }

    // Validate score ranges
    const scoreFields = ['opening', 'chits', 'mod1', 'mod2', 'mod3', 'mod4', 'lobbying', 'solution'];
    for (const field of scoreFields) {
      const value = req.body[field];
      if (value !== '' && value !== null && value !== undefined) {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0 || num > 10) {
          return res.status(400).json({ error: `${field} must be between 0 and 10` });
        }
      }
    }

    // Check if score record exists for this delegate and day
    const existingScore = await db
      .select()
      .from(delegateScoresTable)
      .where(and(
        eq(delegateScoresTable.delegateId, parseInt(delegateId)),
        eq(delegateScoresTable.day, day)
      ))
      .limit(1);

    const scoreData = {
      day: day,
      attendance: attendance || null,
      openingStatement: opening !== '' ? opening : null,
      chits: chits !== '' ? chits : null,
      mod1: mod1 !== '' ? mod1 : null,
      mod2: mod2 !== '' ? mod2 : null,
      mod3: mod3 !== '' ? mod3 : null,
      mod4: mod4 !== '' ? mod4 : null,
      lobbying: lobbying !== '' ? lobbying : null,
      solutionPaper: solution !== '' ? solution : null,
      updatedAt: new Date().toISOString(),
    };

    if (existingScore.length) {
      // Update existing score
      await db
        .update(delegateScoresTable)
        .set(scoreData)
        .where(eq(delegateScoresTable.delegateId, parseInt(delegateId)))
        .where(eq(delegateScoresTable.day, day));
    } else {
      // Insert new score
      await db.insert(delegateScoresTable).values({
        delegateId: parseInt(delegateId),
        ...scoreData,
      });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Error updating score:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get single delegate score
router.get("/:delegateId", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { delegateId } = req.params;
    const { day } = req.query;

    if (!day || (day !== 'day1' && day !== 'day2')) {
      return res.status(400).json({ error: "Valid day parameter (day1 or day2) is required" });
    }

    const score = await db
      .select()
      .from(delegateScoresTable)
      .where(eq(delegateScoresTable.delegateId, parseInt(delegateId)))
      .where(eq(delegateScoresTable.day, day as string))
      .limit(1);

    if (!score.length) {
      return res.json(null);
    }

    return res.json({
      attendance: score[0].attendance,
      opening: score[0].openingStatement ? parseFloat(score[0].openingStatement) : '',
      chits: score[0].chits ? parseFloat(score[0].chits) : '',
      mod1: score[0].mod1 ? parseFloat(score[0].mod1) : '',
      mod2: score[0].mod2 ? parseFloat(score[0].mod2) : '',
      mod3: score[0].mod3 ? parseFloat(score[0].mod3) : '',
      mod4: score[0].mod4 ? parseFloat(score[0].mod4) : '',
      lobbying: score[0].lobbying ? parseFloat(score[0].lobbying) : '',
      solution: score[0].solutionPaper ? parseFloat(score[0].solutionPaper) : '',
    });
  } catch (error) {
    console.error("Error fetching score:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
