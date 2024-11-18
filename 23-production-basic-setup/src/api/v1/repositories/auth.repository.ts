import { UserModel } from '../models';
import { SignupDto } from '../dtos';
import prisma from '../../../config/prisma';

export const findUserByEmail = async (
  email: string,
): Promise<UserModel | null> => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

export const createUser = async (userData: SignupDto): Promise<UserModel> => {
  const newUser = await prisma.user.create({
    data: userData,
  });

  return newUser;
};

export const updateUser = async (
  id: string,
  updateData: Partial<UserModel>,
): Promise<UserModel> => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  return updatedUser;
};

export const removeRefreshToken = async (id: string): Promise<UserModel> => {
  const userWithoutToken = await prisma.user.update({
    where: { id },
    data: { refreshToken: null },
  });
  return userWithoutToken;
};
