import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Establishment from '@modules/establishments/infra/typeorm/entities/Establishment';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('establishment_user')
class Establishment_User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  establishment_id: string;

  @ManyToOne(type => Establishment, establishment => establishment.establishments_Users)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @Column()
  user_id: string;

  @ManyToOne(type => User, user => user.establishments_Users)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Establishment_User;
