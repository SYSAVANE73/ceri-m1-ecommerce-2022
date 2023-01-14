import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { CompteComponent } from './compte.component';

describe('CompteComponent', () => {
  let component: CompteComponent;
  let fixture: ComponentFixture<CompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot(provideMockStore),
      ],
      declarations: [ CompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
