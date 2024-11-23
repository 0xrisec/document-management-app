export interface EntityConfig {
    type: string;
    fields: { key: string; label: string , allowToUpdate?:boolean}[];
    isChat?: boolean;
}

export interface SidebarConfig {
    buttons: { key: string; label: string; icon: string; route: string; roles?: string[] }[];
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

export const SIDEBAR_CONFIG: SidebarConfig = {
    buttons: [
        { key: 'upload', label: 'Upload / Import', icon: 'pi pi-plus-circle', route: '/dashboard/upload' },
        { key: 'documents', label: 'Documents', icon: 'pi pi-book', route: '/dashboard/documents' },
        { key: 'users', label: 'Users', icon: 'pi pi-chart-bar', route: '/dashboard/users', roles: ['admin'] },
    ],
};

export const USER_CONFIGS: EntityConfig = {
    type: 'users',
    fields: [
        { key: 'username', label: 'Username'},
        { key: 'name', label: 'Name'},
        { key: 'roles', label: 'Roles', allowToUpdate: true },
        { key: 'createdAt', label: 'Created At',allowToUpdate: false },
    ],
}

