import { EmployeeBankObj } from "./employee-bank-obj.model";
import { EmployeeObj } from "./employee-obj.model";
import { EmployeeUserObj } from "./employee-user-obj.model";
import { EmployeeUserRoleObj } from "./employee-user-role-obj.model";

export class EmployeeAllObj {
  RefEmpV2Obj: RefEmpV2Wrapper; // Updated to wrap RefEmpV2Obj
  MedicalCoverage: string; // New property
  EmployeeStatus: string; // New property
  constructor() {
      this.RefEmpV2Obj = new RefEmpV2Wrapper(); // Initialize with the new wrapper class
      this.MedicalCoverage = ""; // Default value
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
