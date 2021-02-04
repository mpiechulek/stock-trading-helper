import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nab-bar/nav-bar.component';

// Materials
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSelectModule} from '@angular/material/select'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ 
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    RouterModule, 
    MatSelectModule ,
    FormsModule
  ],
  // entryComponents: [ComicSliderDialogComponent],
  exports: [ 
    NavBarComponent  
  ]
})
export class SharedModule { }
