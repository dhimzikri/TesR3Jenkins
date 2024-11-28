import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FundingCompanyService {
  FormValues: any[] = [];

  constructor() { }

  addChildFormValue(value: any) {
    this.FormValues.push(value);
  }

  getChildFormValues() {
    return this.FormValues;
  }
}
