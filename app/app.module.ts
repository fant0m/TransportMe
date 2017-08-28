import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ItemService } from "./shared/item.service";
import { ItemsComponent } from "./pages/items/items.component";
import { ItemDetailComponent } from "./pages/items/item-detail.component";

import { Config } from "./shared/config";
import * as platform from "platform";
declare var GMSServices: any;

if (platform.isIOS) {
    GMSServices.provideAPIKey(Config.googleApiKey);
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
