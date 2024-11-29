import { EmployeeObj } from "app/shared/model/employee-obj.model";
import { EmployeeUserObj } from "app/shared/model/employee-user-obj.model";
import { EmployeeUserRoleObj } from "app/shared/model/employee-user-role-obj.model";


export class EmployeeAllObjCNAF {
  RefEmpV2Obj: RefEmpV2Wrapper; // Updated to wrap RefEmpV2Obj
  MedicalCoverageAmt: string; // New property
  EmployeeStatus: string; // New property
  constructor() {
      this.RefEmpV2Obj = new RefEmpV2Wrapper(); // Initialize with the new wrapper class
      this.MedicalCoverageAmt = ""; // Default value
      this.EmployeeStatus = ""; // Default value
  }
}

// New Wrapper Class
export class RefEmpV2Wrapper {
  RefEmpV2Obj: EmployeeObj;
  RefUserObj: EmployeeUserObj;
  RefUserRoleObj: EmployeeUserRoleObj;
  constructor() {
      this.RefEmpV2Obj = new EmployeeObj();
      this.RefUserObj = new EmployeeUserObj();
      this.RefUserRoleObj = new EmployeeUserRoleObj();
  }
}
