export interface EntityConfig {
    type: string;
    fields: { key: string; label: string , allowToUpdate?:boolean}[];
    isChat?: boolean;
}

export const DOC_CONFIGS: EntityConfig = {
    type: 'documents',
    isChat: true,
    fields: [
        { key: 'fileName', label: 'Title' },
        { key: 'author', label: 'Author',allowToUpdate: false },
        { key: 'fileType', label: 'Content Type',allowToUpdate: false },
        { key: 'createdAt', label: 'Created At', allowToUpdate: false },
    ],
}

export const USER_CONFIGS: EntityConfig = {
    type: 'users',
    fields: [
        { key: 'username', label: 'Username'},
        { key: 'name', label: 'Name'},
        { key: 'roles', label: 'Roles', allowToUpdate: true },
        { key: 'createdAt', label: 'Created At',allowToUpdate: false },
    ],
}

