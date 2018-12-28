import { Injectable } from '@angular/core';
import { PrContext } from '../model/model';

@Injectable()
export class PrContextService {

  private prContext: PrContext

  constructor() { }
  
  retrievePrContext(): PrContext {
    if (this.prContext) {
      return this.prContext;
    } else {
      const retrievedPrContext = JSON.parse(localStorage.getItem('prContext'));
      return retrievedPrContext;
    }
  }

  storePrContext(prContext: PrContext) {
    this.prContext = prContext;
    localStorage.setItem('prContext', JSON.stringify(prContext));
  }

}
