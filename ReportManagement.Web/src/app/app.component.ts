import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = 'reportmanagement-web';
  constructor(private authService: AuthenticationService,
    translate: TranslateService) {
    if(localStorage.getItem('authToken')) {
      this.authService.setUserDetails();
    }

    //setting the default language
    translate.setDefaultLang('jp');
  }
}
// export class AppComponent implements AfterViewInit {
//   title = "reportmanagement-web";

//   constructor(private renderer: Renderer2) {}

//   ngAfterViewInit() {
//     // let loader = this.renderer.selectRootElement("#loader");
//     // loader.style.display = "none";
//   }
// }
