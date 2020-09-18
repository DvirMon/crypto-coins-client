import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsRootComponent } from './components/coins-root/coins-root.component';
import { AboutComponent } from '../components/about/about.component';
import { CoinsListComponent } from './components/coins-grid/coins-list/coins-list.component';
import { CoinsPanelComponent } from './components/coins-grid/coins-panel/coins-panel.component';
import { CoinsPanelSearchComponent } from './components/coins-grid/coins-panel-search/coins-panel-search.component';

 
const routes: Routes = [
  {
    path: "", component: CoinsRootComponent, children: [
      { path: "list", component: CoinsPanelComponent },
      { path: "search", component: CoinsPanelSearchComponent },
      { path: "charts", loadChildren: () => import('../charts/charts.module').then(m => m.ChartsModule) },
      { path: "info", component: AboutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsRoutingModule { }