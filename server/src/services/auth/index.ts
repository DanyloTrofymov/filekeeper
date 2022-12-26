import { LoginService } from './Login';
import { RegistrationService } from './Registration';
import { TokenService } from './Token';

export default class AuthService {
    static registration = RegistrationService;
    static login = LoginService;
    static token = TokenService;
}
