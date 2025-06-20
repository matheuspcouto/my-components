import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MpcFooterComponent } from './shared/components/mpc-footer/mpc-footer.component';
import { MpcLoaderComponent } from './shared/components/mpc-loader/mpc-loader.component';
import { MpcScrollTopButtonComponent } from "./shared/components/mpc-scroll-top-button/mpc-scroll-top-button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcFooterComponent, MpcLoaderComponent, MpcScrollTopButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}


// TODO: Ajustar Tela de Login
// TODO: Tela de Cadastro
// TODO: Cards
// TODO: Cor de componentes
// TODO: Testes Unitários no Formulário, Revisar retornos e encapsulamento de metodos
