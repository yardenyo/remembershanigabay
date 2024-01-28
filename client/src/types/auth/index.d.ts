export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthState {
  auth: {
    user?: User | null;
    accessToken?: string | null;
  };
}
