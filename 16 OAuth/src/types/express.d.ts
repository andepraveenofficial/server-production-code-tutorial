declare global {
  export namespace Express {
    export interface User {
      user: {
        userId: string;
        userEmail: string;
      };
    }
  }
}
