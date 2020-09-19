import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Establishment from './Establishment';
import Customer from './Customer';

@Entity('establishment_customer')
class Establishment_Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  establishment_id: string;

  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Establishment_Customer;
