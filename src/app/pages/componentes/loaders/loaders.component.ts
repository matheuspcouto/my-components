import { Component } from '@angular/core';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcLoaderService } from '../../../shared/components/mpc-loader/mpc-loader.service';

@Component({
  selector: 'app-loaders',
  imports: [MpcButtonComponent, MpcNavbarComponent ],
  templateUrl: './loaders.component.html',
  styleUrl: './loaders.component.css'
})
export class LoadersComponent {

  constructor(private mpcLoaderService: MpcLoaderService) { }

  abrirLoading() {
    this.mpcLoaderService.show();
    // Implemente a lógica entre a abertura e o fechamento do loading
    setTimeout(() => this.mpcLoaderService.hide(), 5000);
  }

}
