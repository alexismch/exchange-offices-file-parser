import { Injectable } from '@nestjs/common';
import { ExchangeOffice, Country, Exchange, Rate } from '../entities';
import { DataSource } from 'typeorm';

const INDENTING_NBR = 2;
const INDENT = ' ';
const SEPARATOR = ' = ';

enum FileCategory {
   ExchangeOffices = 'exchange-offices',

   ExchangeOffice = 'exchange-office',

   Exchanges = 'exchanges',

   Exchange = 'exchange',

   Rates = 'rates',

   Rate = 'rate',

   Countries = 'countries',

   Country = 'country',
}

@Injectable()
export class FileParserService {
   constructor(private dataSource: DataSource) {}

   async parseAndSave(fileBuffer: Buffer) {
      const { exchangesOffices, countries } = this.parse(fileBuffer);

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
         if (countries?.length) {
            await queryRunner.manager.save(countries);
         }

         if (exchangesOffices?.length) {
            await queryRunner.manager.save(exchangesOffices);
         }

         await queryRunner.commitTransaction();
      } catch (e) {
         await queryRunner.rollbackTransaction();
         throw e;
      } finally {
         await queryRunner.release();
      }
   }

   parse(fileBuffer: Buffer) {
      let exchangesOffices: ExchangeOffice[];
      let countries: Country[];

      const lines = fileBuffer.toString().split(/(?:\r\n|\r|\n)/g);

      let index = 0;
      while (index < lines.length) {
         const { indent, line } = this.getIndentAndLine(lines, index);

         switch (line) {
            case FileCategory.ExchangeOffices:
               exchangesOffices = [];
               index++;
               break;
            case FileCategory.ExchangeOffice:
               if (!exchangesOffices) {
                  this.throwDeclarationMissingError(
                     FileCategory.ExchangeOffices,
                  );
               }
               {
                  const { exchangeOffice, index: newIndex } =
                     this.parseExchangeOffice(lines, index, indent);
                  exchangesOffices.push(exchangeOffice);
                  index = newIndex;
               }
               break;
            case FileCategory.Countries:
               countries = [];
               index++;
               break;
            case FileCategory.Country:
               if (!countries) {
                  this.throwDeclarationMissingError(FileCategory.Countries);
               }
               {
                  const { object: country, index: newIndex } =
                     this.parseFinalObject(new Country(), lines, index, indent);
                  countries.push(country);
                  index = newIndex;
               }
               break;
            default:
               index++;
         }
      }

      return {
         exchangesOffices,
         countries,
      };
   }

   private parseExchangeOffice(
      lines: string[],
      baseIndex: number,
      baseIndent: number,
   ) {
      const exchangeOffice = new ExchangeOffice();

      let index = baseIndex + 1;
      while (index < lines.length) {
         const { indent, line } = this.getIndentAndLine(lines, index);

         if (indent <= baseIndent) {
            break;
         }

         switch (line) {
            case FileCategory.Exchanges:
               exchangeOffice.exchanges = [];
               index++;
               break;
            case FileCategory.Exchange:
               if (!exchangeOffice.exchanges) {
                  this.throwDeclarationMissingError(FileCategory.Exchanges);
               }
               {
                  const { object: exchange, index: newIndex } =
                     this.parseFinalObject(
                        new Exchange(),
                        lines,
                        index,
                        indent,
                     );
                  exchangeOffice.exchanges.push(exchange);
                  index = newIndex;
               }
               break;
            case FileCategory.Rates:
               exchangeOffice.rates = [];
               index++;
               break;
            case FileCategory.Rate:
               if (!exchangeOffice.rates) {
                  this.throwDeclarationMissingError(FileCategory.Rates);
               }
               {
                  const { object: rate, index: newIndex } =
                     this.parseFinalObject(new Rate(), lines, index, indent);
                  exchangeOffice.rates.push(rate);
                  index = newIndex;
               }
               break;
            default: {
               const [prop, value] = line.split(SEPARATOR);
               exchangeOffice[prop] = value;
               index++;
            }
         }
      }

      return {
         exchangeOffice,
         index,
      };
   }

   private parseFinalObject<T = object>(
      object: T,
      lines: string[],
      baseIndex: number,
      baseIndent: number,
   ): {
      object: T;
      index: number;
   } {
      let index = baseIndex + 1;
      while (index < lines.length) {
         const { indent, line } = this.getIndentAndLine(lines, index);

         if (indent <= baseIndent) {
            break;
         }

         const [prop, value] = line.split(SEPARATOR);
         object[prop] = value;

         index++;
      }

      return {
         object,
         index,
      };
   }

   private getIndentAndLine(lines: string[], index: number) {
      const splitLine = lines[index]?.split(INDENT.repeat(INDENTING_NBR));
      const indent = splitLine?.length - 1;
      const line = splitLine[indent];

      return {
         indent,
         line,
      };
   }

   private throwDeclarationMissingError(category: FileCategory) {
      throw new Error(`'${category}' declaration missing in file.`);
   }
}
