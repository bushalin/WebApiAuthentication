import { Component, AfterViewInit, Renderer2 } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  title = "reportmanagement-web";

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // let loader = this.renderer.selectRootElement("#loader");
    // loader.style.display = "none";
  }
}
