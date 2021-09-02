import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookiesService } from 'src/app/core/services/cookies.service';
@Component({
    selector: 'app-global-dialog',
    templateUrl: './global-dialog.component.html'
})
export class GlobalDialogComponent implements OnInit {

    private checkboxState: boolean = false;
    public buttonColor: string = "primary"

    constructor(
        private dialogRef: MatDialogRef<GlobalDialogComponent>,
        private cookiesService: CookiesService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {

        if (this.data.buttonColor) {

            this.buttonColor = this.data.buttonColor;

        }

    }

    /**
     * 
     */
    onConfirm(): void {

        this.dialogRef.close(true);

        // this.setCookie();

    }

    /**
     * 
     */
    onCancel(): void {

        this.dialogRef.close(false);

        // this.setCookie();        

    }

    /**
     * 
     */
    setCookie(): void {

        if (this.checkboxState) {

            this.cookiesService.setCookie(this.cookiesService.homeDialogShowCookieName, true);

        } else {

            this.cookiesService.setCookie(this.cookiesService.homeDialogShowCookieName, false);

        }

    }



}
