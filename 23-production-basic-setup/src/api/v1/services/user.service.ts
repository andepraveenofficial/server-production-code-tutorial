import { UserModel } from '../models';
import { userRepository } from '../repositories';
import {
  applyQueryOptions,
  PaginatedResponse,
} from '../../../utils/query.utils';
import prisma from '../../../config/prisma';
import { Request } from 'express';
import { UpdateUserDto, UpdateUserPartDto } from '../dtos/user.dto';

export const getAllUsers = async (
  req: Request,
): Promise<PaginatedResponse<UserModel>> => {
  // return await userRepository.findAll();
  const paginatedUsers = await applyQueryOptions<UserModel>(
    req,
    prisma.user,
    ['firstName', 'lastName', 'email'], // searchable fields
    ['createdAt'], // sortable fields
  );

  return paginatedUsers;
};

export const getUser = async (id: string): Promise<UserModel> => {
  const user = await userRepository.findById(id);
  return user;
};

export const updateUser = async (
  id: string,
  updateData: UpdateUserDto,
): Promise<UserModel> => {
  const user = await userRepository.update(id, updateData);
  return user;
};

export const updateUserPart = async (
  id: string,
  updates: UpdateUserPartDto,
): Promise<UserModel> => {
  const user = await userRepository.updatePart(id, updates);
  return user;
};

export const deleteProduct = async (id: string): Promise<UserModel> => {
  const user = await userRepository.softDelete(id);
  return user;
};
