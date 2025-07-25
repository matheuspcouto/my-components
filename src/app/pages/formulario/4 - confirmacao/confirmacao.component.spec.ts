import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ConfirmacaoComponent } from './confirmacao.component';
import { InscricaoService } from '../service/inscricao.service';
import { Inscricao } from '../model/inscricao.model';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { ToastrService } from 'ngx-toastr';

describe('ConfirmacaoComponent', () => {
  let component: ConfirmacaoComponent;
  let fixture: ComponentFixture<ConfirmacaoComponent>;
  let mockInscricaoService: any;
  let mockModalSucesso: any;
  let mockToastService: any;
  let mockActivatedRoute: any;
  let router: Router;
  let mockMpcErrorService: any;

  beforeEach(async () => {

    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      inscrever: jest.fn(),
      atualizarDadosInscricao: jest.fn()
    };

    mockModalSucesso = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    };

    mockToastService = { info: jest.fn() };

    mockActivatedRoute = {
      snapshot: { queryParams: { inscricao: '123456789' } }
    };

    mockMpcErrorService = { construirErro: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [ConfirmacaoComponent],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: ToastrService, useValue: mockToastService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MpcErrorService, useValue: mockMpcErrorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoComponent);
    component = fixture.componentInstance;
    component['modalSucesso'] = mockModalSucesso;
    router = TestBed.inject(Router);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar dados da inscrição no ngOnInit', () => {
    const dadosMock = { nome: 'João', sobrenome: 'Silva', dataNasc: '1990-01-01', sexo: 'M', estadoCivil: 'Solteiro', idade: 33, cpfCnpj: '12345678901', telefone: '11999999999', email: 'joao@teste.com', endereco: 'Rua Teste, 123', formaPagamento: 'Cartão', valor: 105.00 };
    mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);
    component.ngOnInit();
    expect(mockInscricaoService.getDadosInscricao).toHaveBeenCalled();
    expect(component['dadosInscricao']).toBeInstanceOf(Inscricao);
  });

  it('deve voltar para a rota anterior ao chamar etapaAnterior', () => {
    const spy = jest.spyOn(router, 'navigate');
    component['etapaAnterior']();
    expect(spy).toHaveBeenCalledWith([Rotas.PAGAMENTO]);
  });

  it('deve formatar valor para moeda brasileira', () => {
    expect((component as any)['formatarValor'](100.50).length).toBeGreaterThan(0);
  });

  it('deve retornar Masculino/Feminino corretamente', () => {
    component['dadosInscricao'] = { sexo: 'M' } as any;
    expect((component as any)['getSexo']()).toBe('Masculino');
    component['dadosInscricao'] = { sexo: 'F' } as any;
    expect((component as any)['getSexo']()).toBe('Feminino');
  });

  it('deve abrir modal de sucesso e executar ações dos botões', () => {
    (component as any)['abrirModalSucesso']();
    expect(mockModalSucesso.abrirModal).toHaveBeenCalled();
    const configModal = mockModalSucesso.abrirModal.mock.calls[0][0];
    expect(configModal.titulo).toBe('Inscrição realizada com sucesso');
    expect(configModal.textoBotao).toBe('Abrir detalhes');
    expect(configModal.textoSegundoBotao).toBe('Fechar');
    if (configModal.segundoBotao) configModal.segundoBotao();
    expect(mockModalSucesso.fecharModal).toHaveBeenCalled();
    const routerSpy = jest.spyOn(router, 'navigate');
    if (configModal.botao) configModal.botao();
    expect(routerSpy).toHaveBeenCalledWith([Rotas.DETALHES_INSCRICAO]);
  });

  it('deve chamar inscrever com sucesso', () => {
    const inscricaoMock = new Inscricao();
    mockInscricaoService.inscrever.mockReturnValue(of(inscricaoMock));
    component['inscrever']();
    expect(mockInscricaoService.inscrever).toHaveBeenCalled();
    expect(mockModalSucesso.abrirModal).toHaveBeenCalled();
  });

  it('deve chamar inscrever e construir erro quando inscrição falha', () => {
    const erro = 'Erro no servidor';
    mockInscricaoService.inscrever.mockReturnValue({
      pipe: () => ({
        subscribe: ({ next, error }: any) => error(erro)
      })
    });
    component['inscrever']();
    expect(mockMpcErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em etapaAnterior', () => {
    const error = new Error('Erro simulado');
    jest.spyOn(router, 'navigate').mockImplementation(() => { throw error; });
    component['etapaAnterior']();
    expect(mockMpcErrorService.construirErro).toHaveBeenCalledWith(error);
  });

  it('deve chamar atualizarDadosInscricao ao inscrever com sucesso', () => {
    const inscricaoMock = new Inscricao();
    mockInscricaoService.inscrever.mockReturnValue(of(inscricaoMock));
    component['inscrever']();
    expect(mockInscricaoService.inscrever).toHaveBeenCalled();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
  });
});
