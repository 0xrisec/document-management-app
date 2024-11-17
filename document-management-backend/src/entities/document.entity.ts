import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('documents')
export class Document {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    title: string;
    @Column()
    content: string; 

    @Column()
    contentType: string;

    @Column()
    author: string;

    @Column({ default: new Date() })
    createdAt: Date;

    @Column()
    userId: ObjectId; // Reference to the User entity
}
