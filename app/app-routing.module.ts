import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ItemsComponent } from "./pages/items/items.component";
import { ItemDetailComponent } from "./pages/items/item-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./pages/home/home.module#HomeModule" },
    { path: "browse", loadChildren: "./pages/browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "./pages/search/search.module#SearchModule" },
    { path: "featured", loadChildren: "./pages/featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "./pages/settings/settings.module#SettingsModule" },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }