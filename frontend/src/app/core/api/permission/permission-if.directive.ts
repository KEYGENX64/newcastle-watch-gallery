import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from './permission.service';
import { Role } from '../enums/role.enums.type';

@Directive({
    selector: '[permissionIf]',
    standalone: true
})
export class PermissionIfDirective {
    @Input('permissionIfElse') elseTemplate: TemplateRef<any> | null = null;

    @Input() set permissionIf(permission: Role) {

        if (this.permissionService.canActivate(permission)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
            if (this.elseTemplate)
                this.viewContainer.createEmbeddedView(this.elseTemplate);
        }
    }

    constructor(
        private permissionService: PermissionService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {
    }
}

