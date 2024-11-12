import { toggleMenu } from './utils/menuUtils';  // Adjust the path if necessary
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Router from './router/Router';
import './styles/global.css';

function initializeApp(): void {
    const app = document.getElementById('app');
    if (!app) {
        console.error('App not found');
        return;
    }

    const router = new Router(app);

    router.addRoute('/', () => Home());
    router.addRoute('/about', () => About());
    router.addRoute('/contact', () => Contact());
    router.addRoute('/dynamic/:product/:id', ({ product, id }) => `<h1>Dynamic Route, Product:${product}, Id:${id}</h1>`);
    // router.addRoute('/login', () => Login()); 

    router.start();

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
            router.navigate(path);
        });
    });

    const navMenu = document.getElementById('nav-menu')!;
    const accountMenu = document.getElementById('account-menu')!;
    const toggleNavMenuButton = document.getElementById('nav-menu-btn')!;
    const toggleAccountMenuButton = document.getElementById('account-menu-btn')!;

    toggleNavMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(navMenu, accountMenu);
    });

    toggleAccountMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(accountMenu, navMenu);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
