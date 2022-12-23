import { auth } from './auth';
import { login } from './login';
import {registration} from './registration'

export default class User {
    static auth = auth;
    static login = login;
    static registration = registration;
}
