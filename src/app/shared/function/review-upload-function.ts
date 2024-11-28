import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import enviConfig from "assets/config/enviConfig.json";
import { Router } from "@angular/router";
import { WorkflowApiObj } from "../model/workflow-api-obj.model";


export function rejectUpload(http: HttpClient, toastr: NGXToastrService, RowObj: any, api: any, router: Router, redirectUrl: any) {
  // Menyiapkan pesan konfirmasi
  const confirmationMessage = 'Are You Sure?';

  // Menampilkan pesan konfirmasi dan menjalankan fungsi untuk menghapus data jika pengguna menekan "OK"
  if (confirm(confirmationMessage)) {
    var wfObj = new WorkflowApiObj();
    wfObj.TaskListId = RowObj.ProcessInstanceId;
    wfObj.TransactionNo = RowObj.UploadNo;
    wfObj.ListValue = { "Status": "RJC" };

    const url = enviConfig.FoundationR3Url + api;
    http.post(url, wfObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        toastr.successMessage(response["Message"]);
        router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(router,[redirectUrl]);
        });
      }
    );
  }
}