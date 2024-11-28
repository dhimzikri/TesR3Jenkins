import { ErrorPageComponent } from "./error-page.component";
import { NgModule } from "@angular/core";
import { ErrorPageRoutingComponent } from "./error-page-routing.module";


@NgModule({
    imports: [
        ErrorPageRoutingComponent
    ],
    declarations :[
        ErrorPageComponent
    ]
})

export class ErrorPageModule {}
