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

@Entity('establishment_links')
class Establishment_Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  establishment_id: string;

  @ManyToOne(type => Establishment, establishment => establishment.establishments_Links)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Establishment_Link;