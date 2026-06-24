import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BaseComponent } from "../base-component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, CommonModule]
})
export class ButtonComponent extends BaseComponent {
}