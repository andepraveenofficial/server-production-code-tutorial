import { Request, Response } from 'express';
import { userService } from '../services';
import { UpdateUserDto } from '../dtos';
import ApiResponse from '../../../handlers/apiResponse.handler';
import asyncHandler from '../../../handlers/async.handler';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers(req);
  new ApiResponse(res, 200, 'Successfully Retrieves Users', users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUser(id);
  new ApiResponse(res, 201, 'User Retrieved successfully', user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateUserDto = req.body;
  const updatedUser = await userService.updateUser(id, updateData);
  new ApiResponse(res, 201, 'User Updated successfully', updatedUser);
});

export const updateUserPart = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateUserDto = req.body;
    const updatedUser = await userService.updateUserPart(id, updateData);
    new ApiResponse(res, 201, 'User Part Updated successfully', updatedUser);
  },
);

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteProduct(id);
  new ApiResponse(res, 201, 'User Deleted successfully', deletedUser);
});
