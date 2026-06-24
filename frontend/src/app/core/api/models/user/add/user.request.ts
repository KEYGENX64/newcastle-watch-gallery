import { Role } from "app/core/api/enums/role.enums.type";

export interface AddUserRequest {
    name: string;
    username: string;
    password: string;
    role: Role;
}

