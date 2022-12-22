import { LoginService } from './Login';
import { RegistrationService } from './Registration';
import { TokenService } from './Token';

class AuthService {
    registration = RegistrationService;
    login = LoginService;
    token = TokenService;
}

export default new AuthService();
