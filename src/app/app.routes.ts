import { Routes } from '@angular/router';
import { SiteAtivoGuard } from './guards/site-ativo.guard';
import { InscricoesGuard } from './guards/inscricoes.guard';
import { PaginaContatoGuard } from './guards/pagina-contato.guard';
import { PaginaPagamentoGuard } from './guards/pagina-pagamento.guard';
import { PaginaConfirmacaoGuard } from './guards/pagina-confirmacao.guard';

export const routes: Routes = [
  /*  Rotas para Home */
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then(c => c.default),
    canActivate: [SiteAtivoGuard]
  },

  /*  Rotas para Componentes */
  {
    path: 'componentes',
    children: [
      {
        path: 'buttons',
        loadComponent: () => import('./pages/componentes/buttons/buttons.component').then(c => c.ButtonsComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'cards',
        loadComponent: () => import('./pages/componentes/cards/cards.component').then(c => c.CardsComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'modais',
        loadComponent: () => import('./pages/componentes/modais/modais.component').then(c => c.ModaisComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'loaders',
        loadComponent: () => import('./pages/componentes/loaders/loaders.component').then(c => c.LoadersComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'navbar',
        loadComponent: () => import('./pages/componentes/navbar/navbar.component').then(c => c.NavbarComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'footer',
        loadComponent: () => import('./pages/componentes/footer/footer.component').then(c => c.FooterComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'scroll-top-button',
        loadComponent: () => import('./pages/componentes/scroll-top-button/scroll-top-button.component').then(c => c.ScrollTopButtonComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'tabs',
        loadComponent: () => import('./pages/componentes/tabs/tabs.component').then(c => c.TabsComponent),
        canActivate: [SiteAtivoGuard]
      },
      {
        path: 'comprovante',
        loadComponent: () => import('./pages/componentes/comprovante/comprovante.component').then(c => c.ComprovanteComponent),
        canActivate: [SiteAtivoGuard]
      },
    ]
  },

  /*  Rotas para Páginas */
  {
    path: 'paginas',
    children: [
      {
        path: 'formulario',
        children: [
          {
            path: 'dados-pessoais',
            loadComponent: () => import('./pages/formulario/1 - dados-pessoais/dados-pessoais.component').then(c => c.default),
            canActivate: [SiteAtivoGuard, InscricoesGuard]
          },
          {
            path: 'contato',
            loadComponent: () => import('./pages/formulario/2 - contato/contato.component').then(c => c.default),
            canActivate: [SiteAtivoGuard, InscricoesGuard, PaginaContatoGuard]
          },
          {
            path: 'pagamento',
            loadComponent: () => import('./pages/formulario/3 - pagamento/pagamento.component').then(c => c.default),
            canActivate: [SiteAtivoGuard, InscricoesGuard, PaginaPagamentoGuard]
          },
          {
            path: 'confirmacao',
            loadComponent: () => import('./pages/formulario/4 - confirmacao/confirmacao.component').then(c => c.ConfirmacaoComponent),
            canActivate: [SiteAtivoGuard, InscricoesGuard, PaginaConfirmacaoGuard]
          },
          {
            path: 'inscricoes-encerradas',
            loadComponent: () => import('./pages/formulario/inscricoes-encerradas/inscricoes-encerradas.component').then(c => c.InscricoesEncerradasComponent),
            canActivate: [SiteAtivoGuard]
          },
        ]
      },
      {
        path: 'aguarde',
        loadComponent: () => import('./pages/aguarde/aguarde.component').then(c => c.default),
        title: 'Mpc Components - Aguarde'
      },
    ]
  },
];
