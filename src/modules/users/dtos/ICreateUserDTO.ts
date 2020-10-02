export default interface ICreateUserDTO {
  email: string;
  username: string;
  password: string;
  avatar: string;
  type: 'employee' | 'customer';
  type_employee: string;
  surname: string;
  whatsapp: string;
  active: '1' | '0';
}
