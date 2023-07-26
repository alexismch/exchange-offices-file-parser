import { Module } from '@nestjs/common';

import { FileParserModule } from './file-parser.module';
import { FileParserController } from './controllers';

@Module({
   imports: [FileParserModule],
   controllers: [FileParserController],
})
export class AppModule {}
