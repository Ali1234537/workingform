export interface User{
    id: string;
    name : string;
    email: string;
}

export interface StoredUser extends User{
    password : string;
}

 

export interface Registered{
    name: string;
    email: string;
    password:string;
}

export interface Loggin{
    email:string;
    password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}