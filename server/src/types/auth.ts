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
