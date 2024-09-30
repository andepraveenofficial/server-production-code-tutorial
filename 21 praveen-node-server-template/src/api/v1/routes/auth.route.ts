import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from './../../../config/prisma';
import asyncHandler from '../../../handlers/async.handler';
import ApiError from '../../../handlers/apiError.handler';
import authMiddleware, {
  AuthRequest,
} from '../../../middlewares/auth.middleware';
import { generateRefreshToken } from '../../../utils/jwt.util';
import ApiResponse from '../../../handlers/apiResponse.handler';
import transporter from '../../../config/nodemailer';
import { userRegistration } from '../../../utils/templates/registration.template';
const router = Router();

// Signup
router.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    console.log('I am Signup Route');

    const data = req.body;

    const { email, password } = data;
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(400, 'User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    sendGmail(email);
    new ApiResponse(res, 200, 'Successfully Registered User', newUser);
  }),
);

// Signin
router.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    console.log('I am Signin Route');
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      throw new ApiError(400, 'User not found');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(400, 'Invalid credentials');
    }

    const data = { userId: user.id };

    const refreshToken = generateRefreshToken(data);

    // Store the refresh token in the database (optional but recommended)
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }, // Assuming you've added a refreshToken field in the User model
    });

    // Successful login
    res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        message: 'Signin successful',
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  }),
);

// Sigout
router.get(
  '/signout',
  authMiddleware,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    console.log('I am sigout Route');
    // Get the user ID from the request object (assuming you store user ID in the request by auth middleware)
    const userId: string | undefined = req.user?.userId;

    if (userId) {
      // Optionally, remove the refresh token from the database
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }

    res
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .status(200)
      .json({ message: 'Signout successful' });
  }),
);

/* -----> SendMails <----- */
async function sendGmail(email: string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to: email, // list of receivers
    subject: 'I am Subject', // Subject line
    text: 'I am Text', // plain text body
    // html: "<div><h1>You Successfully Registered</h1></div>", // html body
    html: userRegistration('Praveen', 'Mahesh'),
  });

  console.log('Message sent: ', info.messageId);
}

export default router;
