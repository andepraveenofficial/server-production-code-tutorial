import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Request } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (err: any, user?: any | false) => void
    ) {
      try {
        // Extract necessary fields from the profile
        const googleId = profile.id; // or profile.sub
        const firstName = profile.given_name;
        const lastName = profile.family_name;
        const email = profile.email;

        // Check if the user already exists
        let user = await prisma.user.findUnique({
          where: { googleId: googleId },
        });

        // If the user doesn't exist, create a new one
        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: googleId,
              firstName: firstName,
              lastName: lastName,
              email: email,
            },
          });
        }


        console.log(user);

        // Pass the user to the next middleware
        return done(null, user);
      } catch (error) {
        console.error("Error saving user: ", error);
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id); // Serialize the user's ID
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
