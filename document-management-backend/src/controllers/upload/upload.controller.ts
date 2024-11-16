import { BadRequestException, Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/services/upload/upload.service';
import { storageConfig } from '../../configurations/storage.config';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage: storageConfig() }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }
        try {
            const result = await this.uploadService.uploadFileToCloudinary(file);
            return {
                message: 'File uploaded successfully',
                url: result.secure_url,
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new InternalServerErrorException('Failed to upload file');
        }
    }
}
