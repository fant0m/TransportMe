import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Item } from "../../shared/item";
import { ItemService } from "../../shared/item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(private routerExtensions: RouterExtensions, private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    onNavBtnTap(){
        this.routerExtensions.backToPreviousPage();
    }
}