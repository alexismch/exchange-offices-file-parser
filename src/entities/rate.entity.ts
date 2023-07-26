import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExchangeOffice } from './exchange-office.entity';

@Entity()
export class Rate {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => ExchangeOffice, (office) => office.rates)
   exchangeOffice: ExchangeOffice;

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
