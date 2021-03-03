import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MocktestPage } from './mocktest.page';

const routes: Routes = [
  {
    path: '',
    component: MocktestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MocktestPageRoutingModule {}
