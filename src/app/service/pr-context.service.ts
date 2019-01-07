import { Injectable } from '@angular/core';
import { PrContext } from '../model/model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PrContextService {

  private prContext: PrContext

  private prContextSubject: Subject<PrContext> = new Subject<PrContext>();

  constructor() { }
  
  loadInitialPrContext(): PrContext {
    if (!this.prContext) {
      const retrievedPrContext = JSON.parse(localStorage.getItem('prContext'));
      this.prContext = retrievedPrContext;
    }
    return this.prContext;
  }

  observePrContext(): Observable<PrContext> {
    return this.prContextSubject.asObservable();
  }

  storePrContext(prContext: PrContext) {
    this.prContext = prContext;
    localStorage.setItem('prContext', JSON.stringify(this.prContext));
    this.prContextSubject.next(this.prContext);
  }

}
