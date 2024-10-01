import { UserModel } from '../models';
import { SignupDto } from '../dtos';
import prisma from '../../../config/prisma';

export const findUserByEmail = async (
  email: string,
): Promise<UserModel | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (userData: SignupDto): Promise<UserModel> => {
  return await prisma.user.create({
    data: userData,
  });
};

export const updateUser = async (
  id: string,
  updateData: Partial<UserModel>,
): Promise<UserModel> => {
  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const removeRefreshToken = async (id: string): Promise<UserModel> => {
  return await prisma.user.update({
    where: { id },
    data: { refreshToken: null },
  });
};
