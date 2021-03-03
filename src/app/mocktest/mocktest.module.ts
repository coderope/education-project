import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MocktestPageRoutingModule } from './mocktest-routing.module';

import { MocktestPage } from './mocktest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MocktestPageRoutingModule
  ],
  declarations: [MocktestPage]
})
export class MocktestPageModule {}
