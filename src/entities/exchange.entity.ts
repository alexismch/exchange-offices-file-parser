import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExchangeOffice } from './exchange-office.entity';

@Entity()
export class Exchange {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => ExchangeOffice, (office) => office.exchanges)
   exchangeOffice: ExchangeOffice;

   @Column()
   from: string;

   @Column()
   to: string;

   @Column({ type: 'float' })
   ask: number;

   @Column()
   date: Date;
}
