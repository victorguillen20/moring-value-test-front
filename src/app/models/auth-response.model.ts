export interface AuthResponse {
  token: string | null;
  tipo: string | null;
  username: string;
  expiresIn: number;
}
