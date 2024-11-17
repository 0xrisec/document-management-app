import { Role } from 'src/enums/roles.enum';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectId; // MongoDB ObjectID

    @Column()
    username: string; 

    @Column()
    name: string;

    @Column()
    password: string; // Hashed password

    @Column()
    email: string;

    @Column()
    roles: Role[]; // Roles assigned to the user (e.g., ['admin', 'user'])

    @Column()
    createdAt: Date; // Date when the user was created
}
