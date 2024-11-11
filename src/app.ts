import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Router from './router/Router';
import './styles/global.css';

// Initialize the app and setup routing
function initializeApp() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('App not found');
        return;
    }

    // Create a new Router instance and start it
    const router = new Router(app);

    // Define routes by importing page components
    router.addRoute('/', () => Home());
    router.addRoute('/about', () => About());
    router.addRoute('/contact', () => Contact());
    router.addRoute('/dynamic/:product/:id', ({ product, id }) => `<h1>Dynamic Route, Product:${product}, Id:${id}</h1>`);
    // router.addRoute('/login', () => Login()); 

    // Start the router to load the initial route
    router.start();


    // Intercept link clicks and navigate using the router
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
            router.navigate(path);
        });
    });


    document.addEventListener('DOMContentLoaded', () => {
        const nav = document.getElementById('nav')!;
        const toggleNavButton = document.getElementById('toggle-nav-btn')!;

        toggleNavButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('toggle nav button clicked');
            if (nav.classList.contains('nav-hidden')) {
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-visible');
                toggleNavButton.textContent = 'Hide Menu';
            } else {
                nav.classList.remove('nav-visible');
                nav.classList.add('nav-hidden');
                toggleNavButton.textContent = 'Show Menu';
            }
            console.log('nav class list:', nav.classList);
        });
    });

}

initializeApp();
