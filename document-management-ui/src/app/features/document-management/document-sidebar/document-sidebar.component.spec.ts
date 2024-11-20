import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSidebarComponent } from './document-sidebar.component';

describe('DocumentSidebarComponent', () => {
  let component: DocumentSidebarComponent;
  let fixture: ComponentFixture<DocumentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
