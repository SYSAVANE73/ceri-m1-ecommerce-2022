import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';

import { FavorisComponent } from './favoris.component';

describe('FavorisComponent', () => {
  let component: FavorisComponent;
  let fixture: ComponentFixture<FavorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        StoreModule.forRoot(provideMockStore),
      ],
      declarations: [ FavorisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
