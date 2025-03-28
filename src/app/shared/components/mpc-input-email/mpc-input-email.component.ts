import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-email',
  imports: [CommonModule],
  templateUrl: './mpc-input-email.component.html',
  styleUrl: './mpc-input-email.component.css'
})
export class MpcInputEmailComponent {

  @Input() id?: string;
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() required?: boolean = false;
  regexEmail: any = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected value?: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.value); }
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
      this.errorMessage = `O campo e-mail é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaRegex()) {
      this.errorMessage = `O campo e-mail não está em um formato válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRegex(): boolean {
    return !new RegExp(this.regexEmail).test(this.Value);
  }

  validaRequired(): boolean {
    return this.required! && this.Value.length === 0;
  }

}
