import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {readFileSync} from 'fs';
import {Observable, Observer} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

export function universalLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => {
      return Observable.create((observer: Observer<any>) => {
        observer.next(JSON.parse(readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8')));
        observer.complete();
      });
    }
  } as TranslateLoader;
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'app-root'}),
    NoopAnimationsModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: universalLoader}
    }),
    ServerModule,
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
