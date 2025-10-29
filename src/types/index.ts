export interface FieldError {
  message: string;
}

export interface ErrorResponse {
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
}
