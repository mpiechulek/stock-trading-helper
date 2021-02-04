import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

// Materials
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSelectModule} from '@angular/material/select'; 
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav'; 

@NgModule({
  declarations: [ 
    NavBarComponent, SideNavComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    RouterModule, 
    MatSelectModule ,
    FormsModule,
    MatSidenavModule
  ],
  // entryComponents: [ComicSliderDialogComponent],
  exports: [ 
    NavBarComponent  
  ]
})
export class SharedModule { }
