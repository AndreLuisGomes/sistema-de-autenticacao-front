export interface User{
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserSession{
    token: string;
    name: string;
}

export interface UserLoginDTO{
    email: string;
    password: string;
}

export class UserLogin{
    email: string | null = null;
    password: string | null = null
}

export interface UserRegisterDTO{
    name: string;
    email: string;
    password: string;   
    role: string;
}