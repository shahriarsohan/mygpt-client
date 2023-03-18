export interface AuthState {
  loading: boolean;
  error: string | object | null;
  msg: string;
  user: {};
  isAuthenticated: boolean | null;
}
