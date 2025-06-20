import { SelectOption } from '../../../shared/components/Inputs/mpc-input-select/mpc-input-select.component';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputSelectComponent } from '../../../shared/components/Inputs/mpc-input-select/mpc-input-select.component';
import { InscricaoService } from '../inscricao.service';
import { MpcInputTextComponent } from '../../../shared/components/Inputs/mpc-input-text/mpc-input-text.component';

@Component({
  selector: 'app-pagamento',
  imports: [
    MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcButtonComponent, MpcInputSelectComponent,
    MpcNavbarComponent, MpcFormProgressBarComponent, MpcInputTextComponent
  ],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export default class PagamentoComponent {

  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private inscricaoService = inject(InscricaoService);

  formasPagamento: SelectOption[] = [
    { label: 'Cartão', value: 'Cartão', selected: false },
    { label: 'Pix', value: 'Pix', selected: false },
    { label: 'Dinheiro', value: 'Dinheiro', selected: false }
  ];

  protected form = this.formBuilder.group({
    formaPagamento: ['', Validators.required],
    valor: [100, Validators.required]
  });

  calcularValorTotal() {
    const valorNormal = 100.00;
    const valorComTaxa = valorNormal as number * 1.05;
    const valorTotal = this.form.value.formaPagamento === 'Cartão' ? valorComTaxa : valorNormal;
    this.form.patchValue({ valor: valorTotal });
  }

  atualizarFormaPagamento(formaPagamento: any) {
    this.form.patchValue({ formaPagamento });
    this.calcularValorTotal();
  }

  formatarValor(valor: any): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  proximaEtapa() {
    if (this.form.invalid) return;
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 4);
    this.router.navigate([Rotas.CONFIRMACAO]);
  }

  etapaAnterior() {
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 2);
    this.router.navigate([Rotas.CONTATO]);
  }
}
