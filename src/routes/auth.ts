import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database/connection';
import { users } from '../database/schema/users';
import { eq } from 'drizzle-orm';

const router = Router();

router.post('/auth/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }
    const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.insert(users).values({
      name, email, oauth_id: hashedPassword,
      stability_tier: 1, faith_mode: false,
      involvement_mode: 'guided', alumni_mode: false,
      checkin_streak: 0, plant_stage: 0,
    }).returning({ id: users.id });

    const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '24h' });
    res.status(201).json({ token, user: { userId: user.id, name, email, stability_tier: 1, checkin_streak: 0, plant_stage: 0, faith_mode: false } });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const valid = await bcrypt.compare(password, user.oauth_id || '');
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '24h' });
    res.json({ token, user: { userId: user.id, name: user.name, email: user.email, stability_tier: user.stability_tier, checkin_streak: user.checkin_streak, plant_stage: user.plant_stage, faith_mode: user.faith_mode } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
