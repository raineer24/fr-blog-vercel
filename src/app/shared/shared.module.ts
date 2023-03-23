import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatProgressSpinnerModule,
    ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class SharedModule {}
