import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Country, Exchange, ExchangeOffice, Rate } from './entities';

@Global()
@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'postgres',
         password: 'postgres',
         database: 'exchange',
         synchronize: true,
         autoLoadEntities: true,
      }),
      TypeOrmModule.forFeature([ExchangeOffice, Country, Exchange, Rate]),
   ],
})
export class PersistenceModule {}
