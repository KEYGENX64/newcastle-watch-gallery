import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { PermissionService } from "app/core/api/permission/permission.service";
import { of, switchMap } from "rxjs";
import { UserService } from "../../user/user.service";
import { Role } from "../enums/role.enums.type";

export const PermissionGuard: CanActivateFn = (route, state) => {
    const _router: Router = inject(Router);
    const _user: UserService = inject(UserService);
    const _permissionService: PermissionService = inject(PermissionService);

    const permissions: Role[] = route.data.permissions;

    return _user.user$.pipe(switchMap((user) => {
        if (permissions.some(permission => _permissionService.canActivate(permission))) return of(true);
        else _router.navigate(["/403"]);

        return of(false);
    }));
}
