import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaInterfaceComponent } from './qna-interface.component';

describe('QnaInterfaceComponent', () => {
  let component: QnaInterfaceComponent;
  let fixture: ComponentFixture<QnaInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QnaInterfaceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QnaInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
