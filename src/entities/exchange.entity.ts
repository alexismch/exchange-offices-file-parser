import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   Relation,
} from 'typeorm';
import { ExchangeOffice } from './exchange-office.entity';

@Entity({ name: 'exchanges' })
export class Exchange {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => ExchangeOffice, (office) => office.exchanges)
   @JoinColumn({ name: 'exchange_office_id' })
   exchangeOffice: Relation<ExchangeOffice>;

   @Column()
   from: string;

   @Column()
   to: string;

   @Column({ type: 'float' })
   ask: number;

   @Column()
   date: Date;
}
