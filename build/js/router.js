class Router {

    rootDiv = null;
    host = null;
    events = null;

    constructor() {
        this.rootDiv = document.querySelector('.master-container');
        this.host = window.location.host;
        
        this.routes = {
            '/' : '',
            'events' : '',
        }

        this.events = this.manageEvents();
    }

    manageEvents() {
        window.onload = () => {this.render()};
        window.onpopstate = () => {
            this.rootDiv.innerHTML = this.routes[window.location.pathname];
        };
    }

    async render(path) {

        path = !path ? window.location.pathname : path;

        if(path === '/') {
            const res = await this.getPage('home');
            this.routes[path] = res;
        }
        else {
            this.routes[path] = await this.getPage(path);
        }

        this.navigation(path);
    }

    async getPage (pathName) {

        const page = `/${pathName}.html`

        try {
            const response = await fetch(page);
            return response.text();
        } catch (error) {
            console.log("Load 404 Page");
        }
    }

    navigation (pathName) {

        window.history.pushState(
            {},
            pathName,
            `${pathName}`,
          );

        this.rootDiv.innerHTML = this.routes[pathName];
    }
}

const pageRouter = new Router();
window.pageRouter = pageRouter;