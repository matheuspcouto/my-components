/**
 * @Componente McpCardMenuComponent
 * Este componente é responsável por exibir um card com título, descrição, ícone e ação de clique.
 *
 * titulo {string}: Título do card.
 * descricao {string}: (opcional) Descrição do card.
 * icone {string}: Ícone do card.
 * acao {Function}: (opcional) Ação de clique do card.
 *
 * Exemplo de utilização:
 * <mpc-card-menu icone="bi bi-telephone" titulo="Telefone" descricao="(63) 9 9201-4337"></mpc-card-menu>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-card-menu',
  imports: [CommonModule],
  templateUrl: './mpc-card-menu.component.html',
  styleUrl: './mpc-card-menu.component.css'
})
export class MpcCardMenuComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() icone: string = '';
  @Input() acao: Function | undefined;

  onClick() {
    if (!this.acao) return;
    this.acao();
  }
}
