/**
 * @Componente MpcInputTelefoneComponent
 * Este componente é responsável por exibir um campo de telefone com validação e máscara.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-telefone label="Telefone" [id]="telefone" [tabIndex]="0" [ariaLabel]="Campo de Telefone" [required]="true" (valor)="setvalor($event)"></mpc-input-telefone>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'mpc-input-telefone',
  imports: [CommonModule, NgxMaskDirective],
  templateUrl: './mpc-input-telefone.component.html',
  styleUrl: './mpc-input-telefone.component.css'
})
export class MpcInputTelefoneComponent {

  @Input() id?: string;
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() required?: boolean = false;
  regexTelefone: any = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
  mascara: string = '(00) 00000-0000';

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected value?: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.removerCaracteresEspeciais(this.value)); }
  }

  get Value(): string {
    return this.value as string;
  }

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(event: any): void {
    this.Value = event.target.value;
    this.onChange(this.Value);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) {
      this.errorMessage = `O campo telefone é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaRegex()) {
      this.errorMessage = `O campo telefone não está em um formato válido. Tente (00) 00000-0000`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRegex(): boolean {
    return !new RegExp(this.regexTelefone).test(this.Value);
  }

  validaRequired(): boolean {
    return this.required! && this.Value.length === 0;
  }

  removerCaracteresEspeciais(telefone: string): string {
    // Remove todos os caracteres não numéricos (espaços, parênteses, traços, etc.)
    return telefone.replace(/\D/g, '');
  }

}
