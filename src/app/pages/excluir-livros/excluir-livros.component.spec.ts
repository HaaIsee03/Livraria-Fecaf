import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirLivrosComponent } from './excluir-livros.component';

describe('ExcluirLivrosComponent', () => {
  let component: ExcluirLivrosComponent;
  let fixture: ComponentFixture<ExcluirLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirLivrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
