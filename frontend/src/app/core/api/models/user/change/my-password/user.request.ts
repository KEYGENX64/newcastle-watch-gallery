export interface ChangeMyPasswordRequest {
    current_password: string;
    new_password: string;
    new_password_confirmation: string; // همان فیلد confirmed لاراول
}

