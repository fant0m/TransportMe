import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ItemEventData } from "ui/list-view";

@Component({
    selector: "SideDrawer",
    moduleId: module.id,
    templateUrl: "./side-drawer.component.html",
    styleUrls: ["./side-drawer.component.css"]
})
export class SideDrawerComponent implements OnInit {
    @Input() selectedPage: string;

    private _navigationItems: Array<any>;

    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this._navigationItems = [
            {
                title: "Home",
                name: "home",
                route: "/home",
                icon: "\uf015"
            },
            {
                title: "Browse",
                name: "browse",
                route: "/browse",
                icon: "\uf1ea"
            },
            {
                title: "Search",
                name: "search",
                route: "/search",
                icon: "\uf002"
            },
            {
                title: "Featured",
                name: "featured",
                route: "/featured",
                icon: "\uf005"
            },
            {
                title: "Settings",
                name: "settings",
                route: "/settings",
                icon: "\uf013"
            }
        ];
    }

    get navigationItems(): Array<any> {
        return this._navigationItems;
    }

    onNavigationItemTap(args: ItemEventData): void {
        const navigationItemView = args.view;
        const navigationItemRoute = navigationItemView.bindingContext.route;

        this.routerExtensions.navigate([navigationItemRoute], {
            transition: {
                name: "slide"
            }
        });
    }

    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}