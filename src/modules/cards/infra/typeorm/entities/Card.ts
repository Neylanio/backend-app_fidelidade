import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

@Entity('cards')
class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stamp_quantity: number;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  promotion_id: string;

  @ManyToOne(() => Promotion)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @Column()
  active: '1' | '0';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Card;
