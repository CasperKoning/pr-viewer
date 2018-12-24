import { Component, OnInit} from '@angular/core';
import { PrContext } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  prContext: PrContext
  
  constructor() { }
  
  ngOnInit() { }

  receivePrContextUpdate(prContext: PrContext) {
    this.prContext = prContext;
  }

}
