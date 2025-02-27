/**
 * @Componente MpcComprovanteComponent
 * Este componente é responsável por exibir um modal de comprovante com informações detalhadas.
 *
 * comprovante {MpcComprovanteConfig}: Configuração do comprovante a ser exibido.
   interface MpcComprovanteConfig {
    titulo: string,
    dados: {
      dadosInscricao: {
        codigoInscricao: string,
        dataInscricao: string,
        status?: string,
      },
      dadosPessoais: { label: string, valor: string }[]
      dadosPagamento: {
        formaPagamento: string,
        valor: number,
        statusPagamento?: string,
        dataPagamento?: string,
      }
    }
  }
 *
 * Exemplo de utilização:
 * <mpc-comprovante #modalExemplo></mpc-comprovante>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MpcComprovanteService } from './mpc-comprovante.service';
import { MpcComprovanteConfig } from './mpc-comprovante.directive';
import { MpcButtonComponent } from "../mpc-button/mpc-button.component";

@Component({
  selector: 'mpc-comprovante',
  imports: [CommonModule, MpcButtonComponent],
  templateUrl: './mpc-comprovante.component.html',
  styleUrls: ['./mpc-comprovante.component.css']
})
export class MpcComprovanteComponent {
  exibir: boolean = false;
  isCopiado: boolean = false;
  dadosInscricao: any = [];
  dadosPessoais: any = [];
  dadosPagamento: any = [];

  @Input() comprovante!: MpcComprovanteConfig;

  constructor(private comprovanteService: MpcComprovanteService, private notificationService: ToastrService) { };

  fecharComprovante() { this.comprovanteService.hide(); this.exibir = false; this.isCopiado = false; }

  abrirComprovante() {
    if (!this.comprovante.dados) return;

    this.dadosInscricao = this.comprovante.dados.dadosInscricao || undefined;
    this.dadosPessoais = this.comprovante.dados.dadosPessoais || undefined;
    this.dadosPagamento = this.comprovante.dados.dadosPagamento || undefined;

    this.comprovanteService.show();
    this.exibir = true;
  };

  copiarCodigo(valor: string) {
    if (!valor) return;
    navigator.clipboard.writeText(valor);
    this.isCopiado = true;
    this.notificationService.info('Copiado para área de transferência', '');
    setTimeout(() => { this.isCopiado = false; }, 3000);
  }

  pedirLinkPagamento() {
    if (this.dadosInscricao.codigoInscricao) {
      const telefone = ''; // telefone do responsável pelo pagamento
      let messageText = `Olá, eu gostaria de obter o pix / link de pagamento da inscrição *${this.dadosInscricao.id}* do AAAAA`;
      let url = `https://api.whatsapp.com/send?phone=55${telefone}&text=${messageText}`;
      window.open(url);
    }
  }

  getBadgeStatusInscricao(status: string) {
    if (status === 'ATIVO') return 'text-bg-success';
    if (status === 'INATIVO') return 'text-bg-danger';
    return;
  }

  getBadgeStatusPagamento(status: string) {
    if (status === 'PAGO') return 'text-bg-success';
    if (status === 'A PAGAR') return 'text-bg-danger';
    return;
  }

  getTextoStatusPagamento(status: string) {
    if (status === 'PAGO') return 'Pagamento realizado';
    if (status === 'A PAGAR') return 'Aguardando pagamento';
    return;
  }

  getTextoStatusInscricao(status: string) {
    if (status === 'ATIVO') return 'Ativo';
    if (status === 'INATIVO') return 'Inativo';
    return;
  }

  formatarValor(valor: number) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatarData(data: string) {
    const date = new Date(data);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return new Date(date).toLocaleDateString('pt-BR');
    }

    return data.substring(0, 10);
  }
}
