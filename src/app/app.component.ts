import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser } from '@angular/common';
import {MetaService} from '@ngx-meta/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angulari18n';

  constructor(
    private translate: TranslateService,
    private metaService: MetaService,
    @Optional() @Inject(REQUEST) private request: Request,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  public ngOnInit(): void {
    const language = this.getLang();
    if (['en', 'es', 'zh', 'ru'].indexOf(language) > -1) {
      this.translate.setDefaultLang(language);
    } else {
      this.translate.setDefaultLang('en');
    }

    this.translate.get(this.title + '_texts.image_og').subscribe(res => {
      this.metaService.setTag( 'og:image', 'http://' + res  );
      this.metaService.setTag( 'og:image:secure_url', 'https://' + res  );
    });
  }

  public getLang(): string {
    let lang: string;
    if (isPlatformBrowser(this.platformId)) {
      lang = this.translate.getBrowserLang();
    } else {
      lang = (this.request.headers['accept-language'] || '').substring(0, 2);
    }
    return lang;
  }


  public switchLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
  }
}
