import { UserModel } from '../models';
import { UpdateUserDto } from '../dtos';
import prisma from '../../../config/prisma';
import ApiError from '../../../handlers/apiError.handler';
import { UpdateUserPartDto } from '../dtos/user.dto';

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

export const update = async (
  id: string,
  updateData: UpdateUserDto,
): Promise<UserModel> => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  return updatedUser;
};

export const updatePart = async (
  id: string,
  updateData: UpdateUserPartDto,
): Promise<UserModel> => {
  const partiallyUpdatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  return partiallyUpdatedUser;
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

  const deletedUser = await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  return deletedUser;
};
