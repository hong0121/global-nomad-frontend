export interface UserResponseType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenUserResponseType {
  user: UserResponseType;
  refreshToken: string;
  accessToken: string;
}
