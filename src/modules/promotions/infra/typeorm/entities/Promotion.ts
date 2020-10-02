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

@Entity('promotions')
class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('timestamp with time zone')
  limit_date: Date;

  @Column()
  total_stamps: number;

  @Column()
  establishment_id: string;

  @ManyToOne(type => Establishment, establishment => establishment.promotions)
  @JoinColumn({ name: 'establishment_id' })
  establishment: Establishment;

  @Column()
  active: '1' | '0';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Promotion;
