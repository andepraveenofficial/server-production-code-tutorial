interface UserModel {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default UserModel;
