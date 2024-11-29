import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-employee-detail-selfcustom",
  templateUrl: "./employee-detail-selfcustom.component.html",
})
export class EmployeeDetailSelfcustomComponent implements OnInit {
  pageName: string;

  constructor() {
    this.pageName = "OrganizationemployeedetailCopyXCNAF";
  }

  ngOnInit(): void {}
}
