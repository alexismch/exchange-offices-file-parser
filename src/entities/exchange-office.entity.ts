import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
   Relation,
} from 'typeorm';
import { Rate } from './rate.entity';
import { Country } from './country.entity';
import { Exchange } from './exchange.entity';

@Entity({ name: 'exchange_offices' })
export class ExchangeOffice {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   name: string;

   @ManyToOne(() => Country, { nullable: false, cascade: true })
   @JoinColumn({ name: 'country_code' })
   country: Country;

   @OneToMany(() => Exchange, (exchange) => exchange.exchangeOffice, {
      cascade: true,
   })
   exchanges: Relation<Exchange[]>;

   @OneToMany(() => Rate, (rate) => rate.exchangeOffice, { cascade: true })
   rates: Relation<Rate[]>;
}
