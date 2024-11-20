import { BadRequestException, Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors, Request, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/services/upload/upload.service';
import { DocumentService } from 'src/services/document/document.service';
import { UserService } from 'src/services/user/user.service';
import { storageConfig } from '../../configurations/storage.config';
import { CreateDocumentDto } from 'src/dto/create-document.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
@UseGuards(AuthGuard('jwt'))
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
        private readonly documentService: DocumentService,
        private readonly userService: UserService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage: storageConfig() }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }
        try {
            const result = await this.uploadService.uploadFileToCloudinary(file);
            const fileUrl: string = result.secure_url;
            const fileType = result.context.custom.file_type;
            const fileName = file.filename;
            const createDocumentDto: CreateDocumentDto = {
                fileType: fileType,
                contentUrl: fileUrl,
                fileName: fileName,
                author: req.user.name,
                userId: req.user.userId,
                originalName: file.originalname
            };

            const document = await this.documentService.create(createDocumentDto);

            return {
                message: 'File uploaded and document created successfully',
                document,
            };
        } catch (error) {
            console.error('Error uploading file or creating document:', error);
            throw new InternalServerErrorException('Failed to upload file or create document');
        }
    }
}
