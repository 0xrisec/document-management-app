import { Module } from '@nestjs/common';
import { UploadController } from 'src/controllers/upload/upload.controller';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { UploadService } from 'src/services/upload/upload.service';

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [UploadService, CloudinaryService],
    exports: [UploadService], // Exporting UploadService if it needs to be used in other modules
})
export class UploadModule { }
