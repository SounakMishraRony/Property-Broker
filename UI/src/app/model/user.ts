export interface UserForRegister {
  userName: string;
  email?: string;
  password: string;
  mobile?: number;
}

export interface UserLogin {
  userName: string;
  token: string;
  password: string;
}
