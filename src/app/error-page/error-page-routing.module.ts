import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ErrorPageComponent } from "./error-page.component";


const routes: Routes = [
    {
        path: '**',
        children: [
            {
                path: '',
                component: ErrorPageComponent,
                data: {
                    title: "error"
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorPageRoutingComponent { }
