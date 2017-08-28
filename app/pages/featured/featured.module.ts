import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SideDrawerModule } from "../../shared/side-drawer.module";
import { FeaturedRoutingModule } from "./featured-routing.module";
import { FeaturedComponent } from "./featured.component";

@NgModule({
    imports: [
        NativeScriptModule,
        FeaturedRoutingModule,
        SideDrawerModule
    ],
    declarations: [
        FeaturedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeaturedModule { }
