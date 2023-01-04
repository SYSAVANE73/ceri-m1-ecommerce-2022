import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterchansonComponent } from './ajouterchanson.component';

describe('AjouterchansonComponent', () => {
  let component: AjouterchansonComponent;
  let fixture: ComponentFixture<AjouterchansonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterchansonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterchansonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
