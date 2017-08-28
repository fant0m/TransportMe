import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { SideDrawerModule } from "../../shared/side-drawer.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SearchService } from "../../shared/search.service";

@NgModule({
    imports: [
        NativeScriptModule,
        HomeRoutingModule,
        SideDrawerModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        SearchService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
