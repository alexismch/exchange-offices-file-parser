import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { readFileSync } from 'fs';

import { FileParserModule } from './file-parser.module';
import { FileParserService } from './services';

async function bootstrap(filePath: string) {
   const app = await NestFactory.createApplicationContext(FileParserModule);
   const fileParserService = app.get(FileParserService);

   console.log('Starting import... 🚀');
   const fileBuffer = readFileSync(filePath);
   await fileParserService.parseAndSave(fileBuffer);

   await app.close();
}

bootstrap(process.argv[2]).then(() => console.log('Import done! 🪐'));
