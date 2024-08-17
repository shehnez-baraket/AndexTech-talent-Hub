import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCodeService {
  private codeSubject = new BehaviorSubject<string>('');
  code$ = this.codeSubject.asObservable();

  setCode(code: string): void {
    this.codeSubject.next(code);
  }

  getCode(): string {
    return this.codeSubject.getValue();
  }
}
