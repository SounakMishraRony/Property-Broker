import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from'@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './property/nav-bar/nav-bar.component';
import { PropertyService } from './services/property.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { Routes,RouterModule } from '@angular/router';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './pipe/filter.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { HttpErrorInterceptorService } from './services/http-interceptor.service';
import { DatePipe } from '@angular/common';
import { UserService } from './services/user.service';

const appRoutes :Routes = [
  {path:'',component :PropertyListComponent },
  {path:'rent-property',component :PropertyListComponent },
  {path:'add-property',component :AddPropertyComponent },
  {path:'property-detail/:id',
        component :PropertyDetailComponent,
        resolve :{prp: PropertyDetailResolverService} },
  {path:'user/login',component :UserLoginComponent },
  {path:'user/register',component :UserRegisterComponent },
  {path:'**',component :PropertyDetailComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    UserRegisterComponent,
    UserLoginComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi: true
},PropertyService,AlertifyService,AuthService,PropertyDetailResolverService,DatePipe,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
