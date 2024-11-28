
import {FormGroup} from '@angular/forms';
import { environment } from 'environments/environment';
import { UrlConstantNew } from '../constant/URLConstantNew';
import { InputFieldObj } from './input-field-obj.model';
import { UcAddressObj } from './uc-address-obj.model';

export class InputAddressObj {
    default: UcAddressObj;
    title : string;
    inputField: InputFieldObj;
    showAllPhn: boolean;
    showPhn1: boolean;
    showPhn2: boolean;
    showPhn3: boolean;
    requiredPhn1: boolean;
    requiredPhn2: boolean;
    requiredPhn3: boolean;
    requiredPhnExt1: boolean;
    requiredPhnExt2: boolean;
    requiredPhnExt3: boolean;
    showFax: boolean;
    showOwnership: boolean;
    requiredOwnership: boolean;
    showSubsection: boolean;
    useStaySince: boolean;
    showStayLength: boolean;
    isRequired: boolean;
    environmentUrl: string;
    isReadonly: boolean;
    isAddrUppercase: boolean;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.default = new UcAddressObj();
        this.title = "Address Information";
        this.inputField = new InputFieldObj(this.UrlConstantNew);
        this.showAllPhn = true;
        this.showPhn1 = true;
        this.showPhn2 = true;
        this.showPhn3 = true;
        this.requiredPhn1 = false;
        this.requiredPhn2 = false;
        this.requiredPhn3 = false;
        this.requiredPhnExt1 = false;
        this.requiredPhnExt2 = false;
        this.requiredPhnExt3 = false;
        this.showFax = true;
        this.showOwnership = false;
        this.requiredOwnership = false;
        this.showSubsection = true;
        this.useStaySince = false;
        this.showStayLength = false;
        this.isRequired = true;
        this.environmentUrl = this.UrlConstantNew.env.FoundationR3Url + "/v1";
        this.isReadonly = false;
        this.isAddrUppercase = true;
    }
}
