import { Component, OnInit} from '@angular/core';

@Component({
    template: "Helo World",
  })
  export class GridComponent implements OnInit {
    ngOnInit() {
      console.log('init grid');
    }
  }
