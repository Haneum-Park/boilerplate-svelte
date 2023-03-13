import { writable } from 'svelte/store';

export interface InitNavItem {
  title: string;
  link: string;
  isActive: boolean;
  isShow: boolean;
}

export const initNavItems = writable<InitNavItem[]>([
  // ? Strategy
  { title: '대시보드', link: '/', isActive: false, isShow: false },
]);

export const setNavItems = (link: string) => {
  initNavItems.update((navItems) => {
    navItems.forEach((item) => {
      item.isActive = item.link === link;
    });

    return navItems;
  });
};
