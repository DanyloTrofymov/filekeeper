import { auth } from './auth';
import { login } from './login';
import { registration } from './registration';

export default class User {
    static auth() {
        auth();
    }
    static login(username, password) {
        login(username, password);
    }
    static registration(email, username, password, repeatPassword) {
        registration(email, username, password, repeatPassword);
    }
}
