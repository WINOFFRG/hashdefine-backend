class Router {

    routes = null;
    globalTitle = null;
    views = null;
    mountPoint = 'body';

    constructor() {

        this.routes = this.setRoutes();
        this.views = this.setViews();
        this.globalTitle = 'Hash Define';
        this.mountPoint = document.querySelector('.master-container');
        
        this.setEvents();
    }

    setEvents() { 
        window.addEventListener("popstate", this.render);

        document.addEventListener("DOMContentLoaded", () => {
            document.body.addEventListener("click", e => {
                if (e.target.matches("[data-link]")) {
                    e.preventDefault();
                    this.navigation(e.target.href);
                }
            });
        
            this.render();
        });
    }

    navigation(url) {
        history.pushState(null, null, url);
        this.render();
    }

    async render() {

        let path = window.location.pathname;

        //Purify Path
        let viewPath = this.views[path] === undefined ? '/error' : path;

        //Fetch Content if not present
        let viewContent = this.views[viewPath] === '' ? await this.getView(this.routes[viewPath].view) : this.views[viewPath];

        this.mountPoint.innerHTML = viewContent;
    };

    setRoutes() {
        return {
            '/': {
                view: 'home',
                title: `${this.globalTitle}`,
            },
            '/events': {
                view: 'events',
                title: `${this.globalTitle} - Events`,
            },
            '/team': {
                view: 'team',
                title: `${this.globalTitle} - Our Team`,
            },
            '/about': {
                view: 'about',
                title: `${this.globalTitle} - About Us`,
            },
            '/error': {
                view: 'error',
                title: `404 - Page Not Found`,
            }
        };
    }
   
    setViews() {
        let views = {};

        Object.keys(this.routes).forEach( route => {
            views[route] = '';
        });

        return views;
    }

    async getView(name) {
        try {
            let page = await fetch(`/${name}.html`);
            page = await page.text();
            name = `/${name}`;
            this.views[name] = page;
            return page;
        } catch (error) {
            console.log(`${name}.html - No Such Page View Found!`);
        }
    }
};

const pageRouter = new Router();