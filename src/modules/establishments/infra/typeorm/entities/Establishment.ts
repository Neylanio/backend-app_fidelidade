import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';

@Entity('establishments')
class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column({
    length: 2,
  })
  uf: string;

  @Column()
  reference_point: string;

  @Column()
  responsible_employee_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'responsible_employee_id', referencedColumnName: 'id' })
  employee: Employee;

  @Column()
  active: '1' | '0';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Establishment;
