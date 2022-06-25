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
import { TechnologyTrainingComponent } from '../../shared/common/services/technology-training/technology-training.component';
import { InternshipComponent } from '../../shared/common/services/internship/internship.component';
import { PlacementMentorshipComponent } from '../../shared/common/services/placement-mentorship/placement-mentorship.component';
import { ConsultancyComponent } from '../../shared/common/services/consultancy/consultancy.component';
import { EdtechComponent } from '../../shared/common/services/edtech/edtech.component';
import { FinancialInclusionComponent } from '../../shared/common/services/financial-inclusion/financial-inclusion.component';
import { OverseasEducationComponent } from '../../shared/common/services/overseas-education/overseas-education.component';
import { SocialImpactComponent } from '../../shared/common/services/social-impact/social-impact.component';
import { ComingSoonComponent } from '../../shared/common/coming-soon/coming-soon.component';
import { ExamcourseComponent } from '../../shared/common/examcourse.component';
import { MyAccountComponent } from '../../shared/common/account/my-account/my-account.component';
import {FeatureCourseComponent} from '../../shared/common/courses/feature-course/feature-course.component'
import { CourseComponentComponent } from '../../shared/common/courses/course-component/course-component.component';
import { SampleComponent } from '../../shared/common/sample.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { FreeMockComponent } from '../../shared/common/free-mock.component';
import { UpdatePasswordComponent } from '../../shared/common/update-password.component';
import { TermsAndConditionsComponent } from '../../shared/common/company/terms-and-conditions.component';
import { RefundPolicyComponent } from '../../shared/common/company/refund-policy.component';
import { PrivacyPolicyComponent } from '../../shared/common/company/privacy-policy.component';
import { DisclaimerComponent } from '../../shared/common/company/disclaimer.component';



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
    { path: 'examcategory/:examCategory', component: ExamcategoryComponent },
    { path: 'examcategoryans/:category/:subCategory/:subCategoryId/:exam/:id/:duration', component: ExamcategoryAnsComponent},
    { path: 'examcourse/:category/:categoryId/:subCategory/:subCategoryId', component: ExamcourseComponent},
    { path: 'technologyTraining', component: TechnologyTrainingComponent },
    { path: 'internship', component: InternshipComponent },
    { path: 'placement', component: PlacementMentorshipComponent },
    { path: 'fintechConsultancy', component: ConsultancyComponent },
    { path: 'edtechConsultancy', component: EdtechComponent },
    { path: 'financialInclusion', component: FinancialInclusionComponent },
    { path: 'overseasEducation', component: OverseasEducationComponent },
    { path: 'socialImpact', component: SocialImpactComponent },
    { path: 'events/comingsoon', component: ComingSoonComponent }, 
    { path: 'myaccount', component: MyAccountComponent }, 
    { path: 'feature-course', component: FeatureCourseComponent},  
    { path: 'sample/:name', component: SampleComponent},
    { path: 'freemock', component: FreeMockComponent},
    { path: 'updatepassword', component: UpdatePasswordComponent},
    { path: 'terms-and-condition', component:TermsAndConditionsComponent },
    { path: 'refund-policy', component:RefundPolicyComponent },
    { path: 'privacy-policy', component:PrivacyPolicyComponent },
    { path: 'disclaimer', component:DisclaimerComponent },
  ]
}]

@NgModule({
  declarations: [HomeComponent, HeaderComponent, MainmenuComponent,
    PagebannerComponent, FooterComponent, SidenavComponent, ServicesComponent,
    AboutusComponent, ContactUsComponent, ContentComponent,
    ExamcategoryComponent, ExamcategoryAnsComponent, TechnologyTrainingComponent, InternshipComponent, PlacementMentorshipComponent, ConsultancyComponent, EdtechComponent, FinancialInclusionComponent, OverseasEducationComponent, SocialImpactComponent, ComingSoonComponent,FeatureCourseComponent,CourseComponentComponent, SampleComponent, FreeMockComponent, UpdatePasswordComponent,TermsAndConditionsComponent,RefundPolicyComponent,PrivacyPolicyComponent,DisclaimerComponent],
  imports: [
    CommonModule, RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true }), FormsModule, MatModule, MatTabsModule, ReactiveFormsModule
  ]
})
export class AppsModule { }
