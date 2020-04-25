import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {EditorModule} from '@tinymce/tinymce-angular';
import {NgxSummernoteModule} from 'ngx-summernote';
import {ArticlesComponent} from './articles.component';
import {ArticleRoutes} from './articles.routing';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ArticleRoutes),
        FormsModule,
        MaterialModule,

        NgxSummernoteModule
    ],
  declarations: [ArticlesComponent]
})
export class ArticlesModule { }
