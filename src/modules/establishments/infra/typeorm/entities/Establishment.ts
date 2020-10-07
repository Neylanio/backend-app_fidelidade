import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Establishment_User from '@modules/establishment_user/infra/typeorm/entities/Establishment_User';
import Establishment_Link from '@modules/establishment_links/infra/typeorm/entities/Establishment_Link';
import Log from '@modules/logs/infra/typeorm/entities/Log';
import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

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

  @Column()
  city: string;

  @Column({
    length: 2,
  })
  uf: string;

  @Column()
  tel: string;

  @Column()
  reference_point: string;

  @Column()
  responsible_user_id: string;

  @OneToMany(type => Establishment_Link, establishment_Link => establishment_Link.establishment)
  establishments_Links: Establishment_Link[];

  @OneToMany(type => Establishment_User, establishment_User => establishment_User.establishment)
  establishments_Users: Establishment_User[];

  @OneToMany(type => Promotion, promotion => promotion.establishment)
  promotions: Promotion[];

  @OneToMany(type => Log, log => log.establishment)
  logs: Log[];

  @ManyToOne(type => User, user => user.establishments)
  @JoinColumn({ name: 'responsible_user_id' })
  user: User;

  @Column()
  active: '1' | '0';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Establishment;
