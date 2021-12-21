class Router {

    routes = null;
    globalTitle = null;
    views = null;
    mountPoint = 'body';

    constructor() {
        this.mountPoint = document.querySelector('.master-container');
        this.globalTitle = 'Hash Define';

        this.routes = this.setRoutes();
        this.views = this.setViews();
        this.loaderElement = document.createElement('div');
        this.loaderElement.className = 'loader';
        
        this.setEvents();
    }
    
    loader(visibility) {
        this.mountPoint.appendChild(this.loaderElement);

        this.loaderElement.style.display = visibility || 'none';
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

    render = async () => {

        try {
            this.mountPoint.innerHTML = "";
            this.loader('block');
            
            let path = window.location.pathname;
            
            //Purify Path
            let viewPath = this.views[path] === undefined ? '/error' : path;

            //Fetch Content if not present
            let viewContent = this.views[viewPath] === '' ? await this.getView(this.routes[viewPath].view) : this.views[viewPath];
            
            this.removeScripts(this.routes[viewPath].scripts);
            
            document.title = this.routes[viewPath].title;
            this.mountPoint.innerHTML = viewContent;
    
            this.loadScripts(this.routes[viewPath].scripts);    

        } catch (error) {
            console.log("An Error Occured while rendering the View!");
        }
        
    };

    setRoutes() {
        return {
            '/': {
                view: 'home',
                title: `${this.globalTitle}`,
                scripts: ['home'],
            },
            '/events': {
                view: 'events',
                title: `${this.globalTitle} - Events`,
                scripts: [],
            },
            '/team': {
                view: 'team',
                title: `${this.globalTitle} - Our Team`,
                scripts: [],
            },
            '/about': {
                view: 'about',
                title: `${this.globalTitle} - About Us`,
                scripts: [],
            },
            '/error': {
                view: 'error',
                title: `404 - Page Not Found`,
                scripts: [],
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

    removeScripts() {

        document.querySelectorAll(`[data-script]`).forEach( (script) => {
            script.remove();
        });
    }

    loadScripts(scripts) {
        scripts.forEach( (script) => {

            if(document.querySelector(`[data-script=${script}]`)) return;

            let scriptElement = document.createElement('script');
            scriptElement.type = 'module';
            scriptElement.src = `/js/${script}.js`;
            scriptElement.setAttribute('data-script', script);
            document.querySelector('body').appendChild(scriptElement);
        });
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