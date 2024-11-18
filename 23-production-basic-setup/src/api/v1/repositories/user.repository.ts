import { UserModel } from '../models';
import { UpdateUserDto } from '../dtos';
import prisma from '../../../config/prisma';
import ApiError from '../../../handlers/apiError.handler';

export const findAll = async (): Promise<UserModel[]> => {
  const users = await prisma.user.findMany({
    where: {
      deletedAt: null, // Only return non-deleted users
    },
  });
  return users;
};

export const findById = async (id: string): Promise<UserModel> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

findById('04b2c215-77d4-43c0-af1b-8e25924e787c');

export const update = async (
  id: string,
  updateData: UpdateUserDto,
): Promise<UserModel> => {
  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const softDelete = async (id: string): Promise<UserModel> => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!existingUser) {
    throw new ApiError(404, 'User not found or already deleted');
  }

  return await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
