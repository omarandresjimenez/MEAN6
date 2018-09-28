import { Component, OnInit, OnDestroy, Input } from "@angular/core";
@Component({
    selector: "app-avatar",
    templateUrl: "./avatar.component.html",
    styleUrls: ["./avatar.component.css"]
  })
  export class AvatarComponent implements OnInit, OnDestroy {
    @Input()
    urlAvatar: string;

    ngOnInit() {}
    ngOnDestroy() {}
  }
