import { Component, input } from "@angular/core";
import { BaseComponent } from "../base-component";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AparatCard } from "./aparat-card.type";

@Component({
    selector: 'aparat-card',
    templateUrl: './aparat-card.component.html',
    styleUrl: './aparat-card.component.scss',
    standalone: true,
    imports: [CommonModule]
})
export class AparatCardComponent extends BaseComponent {

    option = input.required<AparatCard>();
    videoUrl!: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) { super() }

    ngOnInit() {
        console.log(this.option())
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.option().src);
    }
}