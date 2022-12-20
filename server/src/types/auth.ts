export interface IRegistrationBody {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginBody {
    emailOrUsername: string;
    password: string;
}
