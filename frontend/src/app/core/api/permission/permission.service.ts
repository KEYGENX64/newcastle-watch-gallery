import { Injectable } from "@angular/core";
import { UserService } from "../../user/user.service";
import { User } from "../../user/user.types";
import { Role } from "../enums/role.enums.type";

@Injectable({
    providedIn: 'root',
})
export class PermissionService {

    private user: User | null = null;

    constructor(private userService: UserService) {
        this.userService.user$.subscribe(x => {
            this.user = x;
        })
    }

    canActivate(permission: Role): boolean {
        if (!this.user) return false;

        return this.user.role.includes(permission);
    }
}
