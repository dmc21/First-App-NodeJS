var http = require('http');
var url = require('url');


function iniciar(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var dataPosteada = '';
        console.log(`Petición para ${pathname} recibida`);
        
        request.setEncoding('utf8');

        request.addListener("data", (trozoPosteado) => {
            dataPosteada = trozoPosteado;
            console.log(`Recibido trozo POST ${trozoPosteado}.`);
        });

        request.addListener("end", () => {
            route(handle, pathname, response, dataPosteada);
        });
    }
    http.createServer(onRequest).listen(3000);
    console.log('Servidor iniciado');
}

exports.iniciar = iniciar;

