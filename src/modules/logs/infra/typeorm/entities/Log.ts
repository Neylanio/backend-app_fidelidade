import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import Establishment from '@modules/establishments/infra/typeorm/entities/Establishment';

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
