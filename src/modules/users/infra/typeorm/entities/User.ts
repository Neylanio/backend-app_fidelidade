import Card from '@modules/cards/infra/typeorm/entities/Card';
import Establishment from '@modules/establishments/infra/typeorm/entities/Establishment';
import Establishment_User from '@modules/establishment_user/infra/typeorm/entities/Establishment_User';
import Log from '@modules/logs/infra/typeorm/entities/Log';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  type: 'customer' | 'employee';

  @Column()
  type_employee: string;

  @Column()
  surname: string;

  @Column()
  whatsapp: string;

  @Column()
  active: '1' | '0';

  @Column()
  avatar: string;

  @OneToMany(type => Card, card => card.user)
  cards: Card[];

  @OneToMany(type => Establishment_User, establishment_User => establishment_User.user)
  establishments_Users: Establishment_User[];

  @OneToMany(type => Establishment, establishment => establishment.user)
  establishments: Establishment[];

  @OneToMany(type => Log, log => log.user)
  logs: Log[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default User;
