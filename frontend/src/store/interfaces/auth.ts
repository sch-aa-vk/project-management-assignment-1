export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}