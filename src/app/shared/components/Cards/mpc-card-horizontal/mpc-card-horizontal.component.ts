/**
 * @Componente McpCardHorizontalComponent
 * Este componente é responsável por exibir um card com título, subtitulo, descrição, imagem e links.
 *
 * titulo {string}: Título do card.
 * subtitulo {string}: (opcional) Subtítulo do card.
 * descricao {string}: (opcional) Descrição do card.
 * imagem {string}: Imagem do card.
 * links {CardLinks[]}: (opcional) Links do card.
 *
 * Exemplo de utilização:
 * <mpc-card-horizontal titulo="Título do Card" subtitulo="Subtítulo do Card" descricao="Descrição do Card" imagem="imagem.jpg" [links]="[{url: 'https://www.example.com', icone: 'bi bi-link'}]"></mpc-card-horizontal>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CardLinks {
  url: string;
  icone: string;
}

@Component({
  selector: 'mpc-card-horizontal',
  imports: [CommonModule],
  templateUrl: './mpc-card-horizontal.component.html',
  styleUrl: './mpc-card-horizontal.component.css'
})
export class MpcCardHorizontalComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() descricao: string = '';
  @Input() imagem: string = '';
  @Input() links: CardLinks[] = [];

  getImagemCard(): string {
    return this.imagem ? `${this.imagem}` : 'no-image.jpg';
  }
}
