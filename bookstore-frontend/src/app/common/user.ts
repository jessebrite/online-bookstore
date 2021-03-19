import { Role } from './role.enum';

export class User {
  firstname = '';
  lastname = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';
  role =  Role.USER;
  token = '';
}
