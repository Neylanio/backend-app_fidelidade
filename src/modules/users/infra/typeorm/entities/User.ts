import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  active: '1' | '0';

  @Column()
  type: 'employee' | 'customer';

  @Column()
  avatar: string;

  @OneToOne(() => Customer, customer => customer.user)
  customer: Customer;

  @OneToOne(() => Employee, employee => employee.user)
  employee: Employee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
