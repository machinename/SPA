interface Route {
    path: string;
    render: (params: Record<string, string>) => string;
}

class Router {
    private routes: Route[] = [];
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        window.addEventListener('popstate', this.handlePopState);
    }

    // Add a new route
    public addRoute(path: string, render: (params: Record<string, string>) => string) {
        this.routes.push({ path, render });
    }

    // Navigate to a specific path
    public navigate(path: string) {
        history.pushState({}, '', path);
        this.render(path);
    }

    // Render the route content based on the path
    private render(path: string) {
        const matchedRoute = this.matchRoute(path);
        if (matchedRoute) {
            this.container.innerHTML = matchedRoute.render(matchedRoute.params);
        } else {
            this.container.innerHTML = '<h1>404 - Not Found</h1>';
        }
    }

    // Match the dynamic route path
    private matchRoute(path: string): { render: (params: Record<string, string>) => string, params: Record<string, string> } | undefined {
        for (const route of this.routes) {
            const regex = this.pathToRegExp(route.path);
            const match = path.match(regex);

            if (match) {
                const params: Record<string, string> = {};
                const keys = route.path.match(/:([a-zA-Z0-9]+)/g) || [];

                keys.forEach((key, index) => {
                    params[key.slice(1)] = match[index + 1];
                });

                return { render: route.render, params };
            }
        }
        return undefined;
    }

    // Convert route path with dynamic segments to a regular expression
    private pathToRegExp(path: string): RegExp {
        const regexString = path
            .replace(/:[a-zA-Z0-9]+/g, '([a-zA-Z0-9-_]+)')  // Match dynamic segments like :id or :product
            .replace(/\//g, '\\/'); // Escape forward slashes

        return new RegExp(`^${regexString}$`);
    }

    // Handle browser back/forward navigation
    private handlePopState = () => {
        this.render(location.pathname);
    }

    // Start the router and render the initial content
    public start() {
        this.render(location.pathname);
    }
}

export default Router;
