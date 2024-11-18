import bcrypt from 'bcrypt';
import ApiError from '../../../handlers/apiError.handler';
import { generateRefreshToken } from '../../../utils/jwt.util';
import { SignupDto } from '../dtos';
import { UserModel } from '../models';
import { authRepository } from '../repositories';

export const signup = async (data: SignupDto): Promise<UserModel> => {
  const { email, password } = data;

  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await authRepository.createUser({
    ...data,
    password: hashedPassword,
  });

  return newUser;
};

export const signin = async (email: string, password: string) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid credentials');
  }

  const refreshToken = generateRefreshToken({ userId: user.id });
  const updatedUser = await authRepository.updateUser(user.id, {
    refreshToken,
  });

  return { user: updatedUser, refreshToken };
};

export const signout = async (userId: string | undefined) => {
  if (userId) {
    await authRepository.removeRefreshToken(userId);
  }
};
