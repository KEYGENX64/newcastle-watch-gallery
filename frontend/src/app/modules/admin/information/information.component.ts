import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { BaseComponent } from 'app/component/base-component';
import { MenuDrawerComponent } from 'app/component/menu-drawer/menu-drawer.component';
import { Role } from 'app/core/api/enums/role.enums.type';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
    selector: 'information',
    standalone: true,
    templateUrl: './information.component.html',
    imports: [RouterOutlet, MenuDrawerComponent]
})
export class InformationComponent extends BaseComponent {

    user: User;
    /**
     *
     */
    constructor(private readonly _userService: UserService) {
        super();
        _userService.user$.subscribe(us => {
            this.user = us;

            console.log(this.user)
            console.log(Role.User)

            if (this.user.role.includes(Role.User))
                this.menuData = [
                    {
                        id: "category",
                        title: 'navigation.category.title',
                        subtitle: 'navigation.category.subtitle',
                        type: 'group',
                        children: [
                            { id: "category_list", title: 'navigation.category.list', type: 'basic', icon: 'heroicons_outline:users', link: "/information/category/list" }, // <--- این لینک باید درست باشه!
                        ]
                    },

                    { type: "divider" },
                    {
                        id: "product",
                        title: 'navigation.product.title',
                        subtitle: 'navigation.product.subtitle',
                        type: 'group',
                        children: [
                            { id: "product_list", title: 'navigation.product.list', type: 'basic', icon: 'heroicons_outline:document', link: "/information/product/list" },
                        ]
                    }
                ]
        })

    }

    public menuData: FuseNavigationItem[] = [
        {
            id: "category",
            title: 'navigation.category.title',
            subtitle: 'navigation.category.subtitle',
            type: 'group',
            children: [
                { id: "category_add", title: 'navigation.category.add', type: 'basic', icon: 'heroicons_outline:user-plus', link: "/information/category/add" },
                { id: "category_list", title: 'navigation.category.list', type: 'basic', icon: 'heroicons_outline:users', link: "/information/category/list" }, // <--- این لینک باید درست باشه!
            ]
        },
        { type: "divider" },
        {
            id: "user",
            title: 'navigation.user.title',
            subtitle: 'navigation.user.subtitle',
            type: 'group',
            children: [
                { id: "user_add", title: 'navigation.user.add', type: 'basic', icon: 'heroicons_outline:user-plus', link: "/information/user/add" },
                { id: "user_list", title: 'navigation.user.list', type: 'basic', icon: 'heroicons_outline:users', link: "/information/user/list" },
            ]
        },
        { type: "divider" },
        {
            id: "product",
            title: 'navigation.product.title',
            subtitle: 'navigation.product.subtitle',
            type: 'group',
            children: [
                { id: "product_add", title: 'navigation.product.add', type: 'basic', icon: 'heroicons_outline:document-plus', link: "/information/product/add" },
                { id: "product_list", title: 'navigation.product.list', type: 'basic', icon: 'heroicons_outline:document', link: "/information/product/list" },
            ]
        }
    ];

}
