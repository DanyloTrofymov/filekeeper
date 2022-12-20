import { RegistrationController } from './Registration';
import { LoginController } from './Login';

export default class AuthController {
    static registration = RegistrationController;
    static login = LoginController;
}
