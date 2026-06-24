import { Role } from "app/core/api/enums/role.enums.type";

export interface ProfileResponse {
    id: number;
    name: string;
    username: string;
    role: Role;
    created_at: string;
    updated_at: string;
}