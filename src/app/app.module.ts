import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Angular5TimePickerModule} from 'angular5-time-picker';
import {AuthService} from './auth.service';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {NgxSpinnerModule} from 'ngx-spinner';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {AppComponent} from './app.component';

import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FixedpluginModule} from './shared/fixedplugin/fixedplugin.module';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import {AppRoutes} from './app.routing';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {HttpClientModule} from '@angular/common/http';
import {KeyvaluePipe} from './keyvalue.pipe';

export const firebaseConfig = environment.firebaseConfig;


@NgModule({
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        KeyvaluePipe
    ],
  declarations: [KeyvaluePipe],

  
 
  
})
export class MaterialModule {}

@NgModule({
    imports:      [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RouterModule.forRoot(AppRoutes),
        Ng4LoadingSpinnerModule.forRoot(),
        HttpModule,
        HttpClientModule,
        MaterialModule,
        MatNativeDateModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedpluginModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,


        AngularFireStorageModule,
        Angular5TimePickerModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        NgxSpinnerModule
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers:[AuthService],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
    ],
    bootstrap:    [ AppComponent ]

})
export class AppModule { }
