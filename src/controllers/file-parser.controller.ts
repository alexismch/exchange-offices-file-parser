import {
   BadRequestException,
   Controller,
   Post,
   UploadedFile,
   UseInterceptors,
} from '@nestjs/common';
import { FileParserService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller({ path: 'file-parser' })
export class FileParserController {
   constructor(private readonly fileParserService: FileParserService) {}

   @UseInterceptors(FileInterceptor('file'))
   @Post()
   async uploadFile(@UploadedFile() file) {
      try {
         await this.fileParserService.parseAndSave(file.buffer);
      } catch (e) {
         console.log(e);
         throw new BadRequestException();
      }
   }
}
