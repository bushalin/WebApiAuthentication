import { Component, AfterViewInit, Renderer2 } from "@angular/core";
import { AuthenticationService } from "src/services/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import { browser } from "protractor";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "reportmanagement-web";
  constructor(
    private authService: AuthenticationService,
    translate: TranslateService
  ) {
    if (localStorage.getItem("authToken")) {
      this.authService.setUserDetails();
    }

    //setting the default language
    translate.setDefaultLang("jp");

    // DETECTING THE BROWSER LANGUAGE AND SET ACCORDINGLY
    let userLanguage;
    userLanguage = navigator.language;

    if (userLanguage === "en-US") {
      userLanguage = "en";
    }
    if (userLanguage === "ja") {
      userLanguage = "jp";
    }
    translate.use(userLanguage);
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
