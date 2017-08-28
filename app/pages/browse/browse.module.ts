import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SideDrawerModule } from "../../shared/side-drawer.module";
import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";

@NgModule({
    imports: [
        NativeScriptModule,
        BrowseRoutingModule,
        SideDrawerModule
    ],
    declarations: [
        BrowseComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseModule { }
