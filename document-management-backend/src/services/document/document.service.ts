import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CreateDocumentDto } from 'src/dto/create-document.dto';
import { Document } from 'src/entities/document.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: MongoRepository<Document>,
    ) { }

    async create(createDocumentDto: CreateDocumentDto, userId: ObjectId): Promise<Document> {
        const document = this.documentRepository.create({ 
            ...createDocumentDto, 
            userId,
            createdAt: new Date()
        });
        return this.documentRepository.save(document);
    }

    async findAll(userId: ObjectId): Promise<Document[]> {
        return this.documentRepository.find({ where: { userId } });
    }

    // findOne(id: string): Promise<Document> {
    //     return this.documentsRepository.findOneBy({ id: new ObjectId(id) });
    // }

    // async update(id: string, updateData: Partial<Document>): Promise<Document> {
    //     await this.documentsRepository.update(id, updateData);
    //     return this.documentsRepository.findOneBy({ id: new ObjectId(id) });
    // }

    async remove(id: string, userId: ObjectId): Promise<void> {
        const objectId = new ObjectId(id); // Convert string id to ObjectId
        await this.documentRepository.delete({ id: objectId, userId });
    }
}