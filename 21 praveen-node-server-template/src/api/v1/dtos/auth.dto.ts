export interface SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}

export interface SigninDto {
  email: string;
  password: string;
}
