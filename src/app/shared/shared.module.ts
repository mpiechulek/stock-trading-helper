import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nab-bar/nav-bar.component';

@NgModule({
  declarations: [ 
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,  
  ],
  // entryComponents: [ComicSliderDialogComponent],
  exports: [ 
    NavBarComponent  
  ]
})
export class SharedModule { }
