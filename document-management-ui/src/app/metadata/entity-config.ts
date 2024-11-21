export interface EntityConfig {
    type: string;
    url: string;
    fields: { key: string; label: string , allowToUpdate?:boolean}[];
    isChat?: boolean;
}

export const DOC_CONFIGS: EntityConfig = {
    type: 'documents',
    url: "http://localhost:3000/document/",
    isChat: true,
    fields: [
        { key: 'fileName', label: 'Title' },
        { key: 'author', label: 'Author',allowToUpdate: false  },
        { key: 'fileType', label: 'Content Type',allowToUpdate: false  },
        { key: 'createdAt', label: 'Created At', allowToUpdate: false },
    ],
}

export const USER_CONFIGS: EntityConfig = {
    type: 'users',
    url: '',
    fields: [
        { key: 'username', label: 'Username' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'createdAt', label: 'Created At' },
    ],
}

