let VS = require('./websocket');
let http = require('http');
let fs = require('fs');

let serveIndex = (request, response) => {
    if (request.url === '/') {
        fs.readFile(`static/index.html`, (err, data) => {
            if (err) {
                response.end('404, File Not Found')
            } else {
                response.end(data);
            }
        })
    };
};

let serveFile = (request, response) => {
    fs.readFile(`static${request.url}`, (err, data) => {
        if (err) {
            response.end('404, File Not Found')
        } else {
            response.end(data);
        }
    })
};

let findRoute = (method, url) => {
    var foundRoute;
    routes.forEach((route) => {
        if (route.method === method) {
            if (route.path.exec(url)) {
                foundRoute = route;
            }
        }
    })        
    return foundRoute;
};

let routeNotFound = (request, response) => {
    response.statusCode = 404;
    response.end('Unable to communicate');
}

let server = http.createServer( (request, response) => {
    let route = findRoute(request.method, request.url);
    if (route) {
        route.handler(request, response);
    } else {
        routeNotFound(request, response);
    };
});

let routes = [
    { method: 'GET', path: /^\/$/, handler: serveIndex },
    { method: 'GET', path: /^\/[0-9a-zA-Z -.]+\.[0-9a-zA-Z -.]+/, handler: serveFile }
];

server.listen(3000);