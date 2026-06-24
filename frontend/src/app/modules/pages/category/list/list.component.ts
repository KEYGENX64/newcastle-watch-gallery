import { Component } from '@angular/core';
import { FormControlComponent } from 'app/component/form-control.component';
import { PageChangeEvent } from 'app/component/table/page-change.event';
import { TableComponent } from 'app/component/table/table.component';
import { Table } from 'app/component/table/table.type';
import { Role } from 'app/core/api/enums/role.enums.type';
import { CategoriesResponse } from 'app/core/api/models/category/list/categories.response.type';
import { Pager } from 'app/core/api/models/pager.type';
import { CategoryRepository } from 'app/core/api/repositories/category.repository';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'list-category',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    imports: [TableComponent]
})
export class ListCategoryComponent extends FormControlComponent<ListCategoryComponent, any> {

    user: User;

    constructor(private readonly _repository: CategoryRepository, private readonly _userService: UserService) {
        super();
        _userService.user$.subscribe(us => {
            this.user = us;
        })

    }

    config: Table = {
        displayedColumns: ["name"],
        update: (event) => this.onLoad(event),
        actions: [{
            name: "Delete",
            icon: "mat_solid:delete",
            show: (item) => this.user.role.includes(Role.Admin),
            on: (item: CategoriesResponse) => this._repository.Delete({ id: item.id }).pipe(
                switchMap(x => of(true)),
                catchError(x => of(false))
            )
        },
        {
            name: "Edit",
            icon: "mat_solid:edit",
            show: (item) => this.user.role.includes(Role.Admin),
            on: (item: CategoriesResponse) => {
                this._router.navigate(['information', 'category', 'edit', item.id])
                return of(true);
            }
        }],
        headActions: [{
            name: "Add",
            icon: "mat_solid:add",
            show: () => this.user.role.includes(Role.Admin),
            on: () => {
                this._router.navigate(['information', 'category', 'add'])
                return of(true)
            }
        }]
    }

    onLoad(event: PageChangeEvent): Observable<Pager<CategoriesResponse>> {
        return this._repository.List({ currentPage: event.pageIndex, pageSize: event.pageSize })

    }
}