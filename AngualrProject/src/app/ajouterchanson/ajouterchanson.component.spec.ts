import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';

import { AjouterchansonComponent } from './ajouterchanson.component';

describe('AjouterchansonComponent', () => {
  let component: AjouterchansonComponent;
  let fixture: ComponentFixture<AjouterchansonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        RouterTestingModule,
        StoreModule.forRoot(provideMockStore),
      ],
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
