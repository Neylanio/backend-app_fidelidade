export default interface ICreateUserDTO {
  email: string;
  username: string;
  password: string;
  active: '1' | '0';
  type: 'employee' | 'customer';
}
