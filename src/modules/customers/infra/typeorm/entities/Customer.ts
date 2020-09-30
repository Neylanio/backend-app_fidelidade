import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  surname: string;

  @Column()
  whatsapp: string;

  @Column()
  user_id: string;

  @OneToOne(() => User, user => user.customer, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  active: '1' | '0';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
