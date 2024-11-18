import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { CreateDocumentDto } from 'src/dto/create-document.dto';
import { DocumentService } from 'src/services/document/document.service';

@Controller('document')
// @UseGuards(AuthGuard('jwt'))
export class DocumentController {
    constructor(private readonly documentsService: DocumentService) { }

    @Post()
    create(@Body() createDocumentDto: CreateDocumentDto, @Request() req) {
        const userId = req.user.userId;
        if (!userId) {
            throw new BadRequestException('User ID is required');
        }
        return this.documentsService.create(createDocumentDto, userId);
    }

    @Get()
    findAll(@Request() req) {
        const userId = req.user.userId;
        if (!userId) {
            throw new BadRequestException('User ID is required');
        }
        return this.documentsService.findAll(userId);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.documentsService.findOne(id);
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateDocumentDto: Partial<Document>) {
    //     return this.documentsService.update(id, updateDocumentDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        const userId = req.user.userId;
        if (!userId) {
            throw new BadRequestException('User ID is required');
        }

        // Validate the document ID
        if (!id || !ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid document ID');
        }

        return this.documentsService.remove(id, userId);
    }
}
