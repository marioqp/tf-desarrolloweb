import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelResumen } from './panel-resumen';

describe('PanelResumen', () => {
  let component: PanelResumen;
  let fixture: ComponentFixture<PanelResumen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelResumen],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelResumen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
