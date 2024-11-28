import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewDocumentComponent } from './customer-view-document.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewDocumentComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class  CustomerViewDocumentRoutingModule { }


