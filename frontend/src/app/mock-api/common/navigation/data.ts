/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

const defaultNav: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'navigation.dashboard.title',
        tooltip: 'navigation.dashboard.tooltip',
        type: 'basic',
        icon: 'mat_outline:dashboard',
        link: '/dashboard'
    },
        {
        id: 'information',
        title: 'navigation.information.title',
        tooltip: 'navigation.information.tooltip',
        type: 'basic',
        icon: 'mat_outline:information',
        link: '/information'
    }
];

export const defaultNavigation: FuseNavigationItem[] = defaultNav;
export const compactNavigation: FuseNavigationItem[] = defaultNav;
export const futuristicNavigation: FuseNavigationItem[] = defaultNav;
export const horizontalNavigation: FuseNavigationItem[] = defaultNav;
