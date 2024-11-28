import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import { StorageService } from 'app/shared/services/StorageService';
import { SidebarComponent } from 'app/shared/sidebar/sidebar.component';
import { NgxSpinnerService } from 'ngx-spinner';

var fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
};

@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.css']
})

export class FullLayoutComponent implements OnInit {

    options = {
        direction: 'ltr'
    };

    @ViewChild(SidebarComponent) sbComp: SidebarComponent;
    @ViewChild(NavbarComponent) nbComp: NavbarComponent;
    subEnd: any;
    unsubscribe: any;

    constructor(private elementRef: ElementRef, private strService: StorageService, private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.unsubscribe = this.strService.watch(AdInsConstant.WatchRoleState).subscribe(
            (response) => {
                console.log(response);
                if (response == true) {
                    this.sbComp.setMenu();
                    this.nbComp.setUser();
                }
            }
        );
        this.CheckDevice();
        // this.subEnd = this.strService.watch("isLoading").subscribe(
        //     (response) => {
        //         if (response == true) {
        //             this.spinner.show();
        //         } else {
        //             this.spinner.hide();
        //         }

        //     }
        // );

        //sidebar toggle event listner
        this.elementRef.nativeElement.querySelector("#sidebarToggle")
            .addEventListener("click", this.onClick.bind(this));
        //customizer events
        // this.elementRef.nativeElement.querySelector("#cz-compact-menu")
        //     .addEventListener("click", this.onClick.bind(this));
        // this.elementRef.nativeElement.querySelector("#cz-sidebar-width")
        //     .addEventListener("click", this.onClick.bind(this));
    }

    IsWeb: boolean = true;
    webUrl: string = "";
    CheckDevice() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            console.log("mobile device");
            this.IsWeb = false;
            this.webUrl = "https://api.whatsapp.com";
            return
        }
        this.webUrl = "https://web.whatsapp.com/";
        console.log("not mobile device");
    }

    ngOnDestroy() {
        // this.subEnd.unsubscribe();
        if (this.unsubscribe) {
            this.unsubscribe.next();
            this.unsubscribe.complete();
        }
    }

    onClick(event) {
        //initialize window resizer event on sidebar toggle click event
        setTimeout(() => { fireRefreshEventOnWindow() }, 300);
    }

    getOptions($event): void {
        this.options = $event;
    }

}
