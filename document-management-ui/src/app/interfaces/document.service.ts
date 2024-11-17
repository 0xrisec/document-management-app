import { Injectable } from '@angular/core';

@Injectable()
export class DocumentService {
    getDocumentsData() {
        return [
            {
                id: '1000',
                title: 'Project Plan',
                content: 'Detailed project plan content',
                contentType: 'text',
                author: 'John Doe',
                createdAt: new Date('2023-01-01'),
                userId: 'user123'
            },
            {
                id: '1001',
                title: 'Budget Report',
                content: 'Quarterly budget report content',
                contentType: 'text',
                author: 'Jane Smith',
                createdAt: new Date('2023-02-01'),
                userId: 'user456'
            }
            // Add more documents as needed
        ];
    }

    getDocuments() {
        return Promise.resolve(this.getDocumentsData());
    }
}
