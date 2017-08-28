import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SideDrawerModule } from "../../shared/side-drawer.module";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";

@NgModule({
    imports: [
        NativeScriptModule,
        SearchRoutingModule,
        SideDrawerModule
    ],
    declarations: [
        SearchComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
