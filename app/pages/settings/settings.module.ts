import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SideDrawerModule } from "../../shared/side-drawer.module";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

@NgModule({
    imports: [
        NativeScriptModule,
        SettingsRoutingModule,
        SideDrawerModule
    ],
    declarations: [
        SettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
