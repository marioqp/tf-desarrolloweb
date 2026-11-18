import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarTecnico } from './registrar-tecnico';

describe('RegistrarTecnico', () => {
  let component: RegistrarTecnico;
  let fixture: ComponentFixture<RegistrarTecnico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTecnico],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarTecnico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
