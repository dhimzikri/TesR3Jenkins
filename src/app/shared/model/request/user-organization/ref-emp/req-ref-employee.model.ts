import { EmpBankAccObj } from "app/shared/model/emp-bank-acc-obj.model";
import { RefEmployeeObj } from "app/shared/model/ref-employee-obj";
import { RefUserObj } from "app/shared/model/ref-user-obj.model";
import { RefUserRole } from "app/shared/model/ref-user-role-obj.model";

export class ReqRefEmployeeObj {
    
    RefEmployeeObj: RefEmployeeObj;
    RefUserObj: RefUserObj;
    EmpBankAccObj: EmpBankAccObj;
    RefUserRoleObj : RefUserRole;
    
    constructor()
    {
        this.RefEmployeeObj = new RefEmployeeObj();
        this.RefUserObj = new RefUserObj();
        this.EmpBankAccObj = new EmpBankAccObj();
        this.RefUserRoleObj = new RefUserRole();
    }
    
}  