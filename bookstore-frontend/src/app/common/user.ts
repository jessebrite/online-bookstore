import { Role } from './role.enum';

export class User {
  firstname = '';
  lastname = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  street = '';
  city = '';
  state = '';
  zip = '';
  country = '';
  phoneNumber = '';
  message = '';
  role = [Role.USER];
  token = '';
}
