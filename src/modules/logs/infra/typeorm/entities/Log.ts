import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
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
  user_id: string;

  @ManyToOne(type => User, user => user.logs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  establishment_id: string;

  @ManyToOne(type => Establishment, establishment => establishment.logs)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @CreateDateColumn()
  created_at: Date;
}

export default Log;
