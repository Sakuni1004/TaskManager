// global.d.ts or types/global.d.ts

declare namespace Express {
    export interface Request {
      user?: { id: string; role: string }; // Define the structure of the user object
    }
  }