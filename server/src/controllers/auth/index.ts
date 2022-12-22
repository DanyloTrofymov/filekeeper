import { RegistrationController } from './Registration';
import { LoginController } from './Login';
import { TokenController } from './Token';

export default class AuthController {
    static registration = RegistrationController;
    static login = LoginController;
    static auth = TokenController;
}
