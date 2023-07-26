import {
   Column,
   Entity,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { Rate } from './rate.entity';
import { Country } from './country.entity';
import { Exchange } from './exchange.entity';

@Entity()
export class ExchangeOffice {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   name: string;

   @ManyToOne(() => Country, { nullable: false, cascade: true })
   country: Country;

   @OneToMany(() => Exchange, (exchange) => exchange.exchangeOffice, {
      cascade: true,
   })
   exchanges: Exchange[];

   @OneToMany(() => Rate, (rate) => rate.exchangeOffice, { cascade: true })
   rates: Rate[];
}
