
type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

// for auth server
type LoginResponse = MessageResponse & {
  token: string;
  message: string;
};

export type { MessageResponse, ErrorResponse, LoginResponse };