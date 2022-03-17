import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from '../../shared/home/home.component';
import { ContentComponent } from '../../shared/home/content.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../../../mat-module/mat.module';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { SidenavComponent } from '../../common/sidenav/sidenav.component';
import { ServicesComponent } from '../../shared/common/services.component';
import { AboutusComponent } from '../../shared/common/aboutus.component';
import { ContactUsComponent } from '../../shared/common/contact-us.component';
import { MainmenuComponent } from '../../common/mainmenu/mainmenu.component';
import { PagebannerComponent } from '../../common/pagebanner/pagebanner.component'
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from '../../shared/common/events.component';
import {ExamcategoryComponent} from '../../shared/common/examcategory.component';
import {ExamcategoryAnsComponent} from '../../shared/common/examcategoryans.component';


const routes: Routes = [{
  path: '',
  component: ContentComponent,
  children:[
    { path: '', component: HomeComponent },
    {
      path: 'home', component: HomeComponent 
    },    
    { path: 'aboutus', component: AboutusComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'events', component: EventsComponent },
    { path: 'examcategory/:subCategory', component: ExamcategoryComponent },
    { path: 'examcategoryans/:exam', component: ExamcategoryAnsComponent}
  ]
}]

@NgModule({
  declarations: [HomeComponent, HeaderComponent, MainmenuComponent,
    PagebannerComponent, FooterComponent, SidenavComponent, ServicesComponent,
    AboutusComponent, ContactUsComponent, ContentComponent,
    ExamcategoryComponent, ExamcategoryAnsComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes), FormsModule, MatModule, MatTabsModule, ReactiveFormsModule
  ]
})
export class AppsModule { }
