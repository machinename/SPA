export function toggleMenu(
    menu: HTMLElement,
    otherMenu: HTMLElement,
): void {
    if (menu.classList.contains('nav-hidden')) {
        menu.classList.remove('nav-hidden');
        menu.classList.add('nav-visible');
        otherMenu.classList.remove('nav-visible');
        otherMenu.classList.add('nav-hidden');
    } else {
        menu.classList.remove('nav-visible');
        menu.classList.add('nav-hidden');
        otherMenu.classList.remove('nav-visible');
        otherMenu.classList.add('nav-hidden');
    }
}
