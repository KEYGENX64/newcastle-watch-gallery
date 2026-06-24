import { Component } from '@angular/core';
import { FormControlComponent } from 'app/component/form-control.component';
import { PageChangeEvent } from 'app/component/table/page-change.event';
import { TableComponent } from 'app/component/table/table.component';
import { Table } from 'app/component/table/table.type';
import { Pager } from 'app/core/api/models/pager.type';
import { UserResponse } from 'app/core/api/models/user/detail/user.response';
import { UsersResponse } from 'app/core/api/models/user/list/user.response';
import { UserRepository } from 'app/core/api/repositories/user.repository';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { UserChangePasswordComponent } from '../change-password/change-password.component';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { Role } from 'app/core/api/enums/role.enums.type';

@Component({
    selector: 'list-user',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    imports: [TableComponent]
})
export class ListUserComponent extends FormControlComponent<ListUserComponent, any> {
    constructor(private readonly _repository: UserRepository, private readonly _userService: UserService) {
        super();
        _userService.user$.subscribe(us => {
            this.user = us;
        })

    }
    user: User;

    config: Table = {
        displayedColumns: ["name", "username", { name: "role", type: "enum" }, {name:"created_at",type:"date"}, {name:"updated_at",type:"date"}],
        update: (event) => this.onLoad(event),
        actions: [{
            name: "Delete",
            icon: "mat_solid:delete",
            show: (item) => this.user.role.includes(Role.Admin),
            on: (item: UsersResponse) => this._repository.Delete({ id: item.id }).pipe(
                switchMap(x => of(true)),
                catchError(x => of(false))
            )
        },
        {
            name: "Edit",
            icon: "mat_solid:edit",
            show: (item) => this.user.role.includes(Role.Admin),
            on: (item: UsersResponse) => {
                this._router.navigate(['information', 'user', 'edit', item.id])
                return of(true);
            }
        },
        {
            name: "Password",
            icon: "mat_outline:password",
            show: (item) => this.user.role.includes(Role.Admin),
            on: (item: UsersResponse) => {
                let _dialogRef = this._dialog.open(UserChangePasswordComponent, {
                    width: '50%',
                    height: '50%',
                    data: { id: item.id }
                });
                return _dialogRef.afterClosed().pipe(
                    switchMap(x => of(false)),
                    catchError(x => of(false))
                );
            }
        },],
        headActions: [{
            name: "Add",
            icon: "mat_solid:add",
            show: () => this.user.role.includes(Role.Admin),
            on: () => {
                this._router.navigate(['information', 'user', 'add'])
                return of(true)
            }
        }]
    }

    onLoad(event: PageChangeEvent): Observable<Pager<UserResponse>> {
        return this._repository.List({ currentPage: event.pageIndex, pageSize: event.pageSize })
    }
}