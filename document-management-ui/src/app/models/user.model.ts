// import { Role } from 'src/enums/roles.enum';
export class User {
    id?: string;
    username!: string;
    name!: string;
    password!: string;
    email!: string;
}

export class LoginUser {
    email!: string;
    password!: string;
}