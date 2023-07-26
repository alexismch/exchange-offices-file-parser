import { Module } from '@nestjs/common';

import { FileParserService } from './services';
import { PersistenceModule } from './persistence.module';

@Module({
   imports: [PersistenceModule],
   providers: [FileParserService],
   exports: [FileParserService],
})
export class FileParserModule {}
