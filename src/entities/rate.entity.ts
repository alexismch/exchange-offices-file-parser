import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   Relation,
} from 'typeorm';
import { ExchangeOffice } from './exchange-office.entity';

@Entity({ name: 'rates' })
export class Rate {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => ExchangeOffice, (office) => office.rates)
   @JoinColumn({ name: 'exchange_office_id' })
   exchangeOffice: Relation<ExchangeOffice>;

   @Column()
   from: string;

   @Column()
   to: string;

   @Column({ type: 'float' })
   in: number;

   @Column({ type: 'float' })
   out: number;

   @Column({ type: 'float' })
   reserve: number;

   @Column()
   date: Date;
}
