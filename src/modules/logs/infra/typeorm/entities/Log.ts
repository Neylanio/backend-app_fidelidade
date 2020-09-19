import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Employee from './Employee';
import Establishment from './Establishment';

@Entity('logs')
class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ip: string;

  @Column()
  where: string;

  @Column()
  what: string;

  @Column()
  employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  establishment_id: string;

  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @CreateDateColumn()
  created_at: Date;
}

export default Log;
