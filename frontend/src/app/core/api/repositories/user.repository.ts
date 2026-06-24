import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { map, Observable } from "rxjs";

import { Pager } from "../models/pager.type";
import { UserRequest } from "../models/user/detail/user.request";
import { UserResponse } from "../models/user/detail/user.response";
import { UpdateUserRequest } from "../models/user/update/user.request";
import { UpdateUserResponse } from "../models/user/update/user.response";
import { AddUserRequest } from "../models/user/add/user.request";
import { AddUserResponse } from "../models/user/add/user.response";
import { DeleteUserResponse } from "../models/user/delete/user.response";
import { DeleteUserRequest } from "../models/user/delete/user.request";
import { UsersRequest } from "../models/user/list/user.request";
import { UsersResponse } from "../models/user/list/user.response";
import { ChangeMyPasswordRequest } from "../models/user/change/my-password/user.request";
import { ChangeMyPasswordResponse } from "../models/user/change/my-password/user.response";
import { ChangeUserPasswordRequest } from "../models/user/change/password/user.request";
import { ChangeUserPasswordResponse } from "../models/user/change/password/user.response";
import { UpdateProfileRequest } from "../models/user/update profile/user.request";
import { UpdateProfileResponse } from "../models/user/update profile/user.response";
import { ProfileResponse } from "../models/user/profile/user.response";
import { ProfileRequest } from "../models/user/profile/user.request";





@Injectable({
    providedIn: 'root',
})
export class UserRepository {
    constructor(private api: ApiService) { }


    public List(request: UsersRequest): Observable<Pager<UsersResponse>> {
        return this.api.Users(request)
            .pipe(
                map((result: any) => {
                    return {
                        elements: result.data,
                        pagination: {
                            totalRecords: result.meta.total,
                            count: result.data.length,
                            totalPages: result.meta.last_page,
                            nextPage: result.meta.current_page < result.meta.last_page ? result.meta.current_page + 1 : result.meta.current_page,
                            previousPage: result.meta.current_page > 1 ? result.meta.current_page - 1 : 1,
                            lastPage: result.meta.last_page,
                            pageSize: result.meta.per_page,
                            currentPage: result.meta.current_page,
                        }
                    }
                })
            );
    }
    public Detail(request: UserRequest): Observable<UserResponse> {
        return this.api.User(request).pipe(
            map(x => x.data)
        );


    }
    public Update(request: UpdateUserRequest): Observable<UpdateUserResponse> {
        return this.api.UpdateUser(request).pipe(
            map(x => x.data)
        );
    }
    public Add(request: AddUserRequest): Observable<AddUserResponse> {
        return this.api.AddUser(request).pipe(
            map(x => x.data)
        );
    }
    public Profile(request: ProfileRequest): Observable<ProfileResponse> {
        return this.api.ProfileUser(request).pipe(
            map(x => x.data)
        );
    }
    public UpdateProfile(request: UpdateProfileRequest): Observable<UpdateProfileResponse> {
        return this.api.UpdateProfileUser(request).pipe(
            map(x => x.data)
        );
    }
    public ChangeMyPassword(request: ChangeMyPasswordRequest): Observable<ChangeMyPasswordResponse> {
        return this.api.ChangeMyPassword(request);
    }
    public ChangePassword(request: ChangeUserPasswordRequest): Observable<ChangeUserPasswordResponse> {
        return this.api.ChangePassword(request);
    }
    public Delete(request: DeleteUserRequest): Observable<DeleteUserResponse> {
        return this.api.DeleteUser(request);
    }
}