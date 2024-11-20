import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocQnaInterfaceComponent } from './doc-qna-interface.component';

describe('DocQnaInterfaceComponent', () => {
  let component: DocQnaInterfaceComponent;
  let fixture: ComponentFixture<DocQnaInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocQnaInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocQnaInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
