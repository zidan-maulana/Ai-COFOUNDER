// src/types/express.d.ts
// Extend Express Request type dengan custom properties

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}