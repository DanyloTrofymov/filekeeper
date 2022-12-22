export interface IRegistrationBody {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginBody {
    username: string;
    password: string;
}

export interface ITokenBody {
    userId: string;
    email: string;
    username: string;
}
