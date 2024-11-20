export interface EntityConfig {
    type: string;
    url: string;
    fields: { key: string; label: string }[];
    isChat?: boolean;
}

export const DOC_CONFIGS: EntityConfig = {
    type: 'documents',
    url: "http://localhost:3000/document/",
    isChat: true,
    fields: [
        { key: 'fileName', label: 'Title' },
        { key: 'author', label: 'Author' },
        { key: 'fileType', label: 'Content Type' },
        { key: 'createdAt', label: 'Created At' },
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

