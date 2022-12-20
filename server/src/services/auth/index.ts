//import { LoginService } from "./Login";
import { RegistrationService } from './Registration';

class AuthService {
    registration = RegistrationService;
    //  login = LoginService;
}

export default new AuthService();
