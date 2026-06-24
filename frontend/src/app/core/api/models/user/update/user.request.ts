import { Role } from "app/core/api/enums/role.enums.type";

export interface UpdateUserRequest {
    name?: string;
    username?: string;
    role?: Role;
    id:number;
}

