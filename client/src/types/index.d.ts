export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorResponse {
  status: string;
  data: {
    status: string;
    success: boolean;
    message: string;
  };
}
