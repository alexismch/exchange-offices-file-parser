import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { readFileSync } from 'fs';

import { AppModule } from './app.module';
import { FileParserService } from './services';

async function bootstrap(filePath: string) {
   const app = await NestFactory.createApplicationContext(AppModule);
   const fileParserService = app.get(FileParserService);

   console.log('Starting import... 🚀');
   const fileBuffer = readFileSync(filePath);
   await fileParserService.parseAndSave(fileBuffer);

   await app.close();
}

console.log(process.argv);
bootstrap(process.argv[2]).then(() => console.log('Import done! 🪐'));
