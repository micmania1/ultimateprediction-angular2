import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Toolbar } from '../toolbar';
import { AppState } from '../app.service';
import { AuthService, SessionService } from '../services';
import { PredictionPageComponent } from './prediction-page.component';

describe('PredictionPageComponent', () => {
  let component: PredictionPageComponent;
  let fixture: ComponentFixture<PredictionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        PredictionPageComponent,
        Toolbar
      ],
      providers: [
        AppState,
        AuthService,
        SessionService
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PredictionPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });;
  }));

  it('should create', () => {
    expect(component instanceof PredictionPageComponent).toBeTruthy();
  });
});
