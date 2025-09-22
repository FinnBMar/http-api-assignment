const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses');
const api = require('./responses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const pathName = parsedUrl.pathname;

  switch (pathName) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      api.success(request, response);
      break;
    case '/badRequest':
      api.badRequest(request, response, parsedUrl.query);
      break;
    case '/unauthorized':
      api.unauthorized(request, response, parsedUrl.query);
      break;
    case '/forbidden':
      api.forbidden(request, response);
      break;
    case '/internal':
      api.internal(request, response);
      break;
    case '/notImplemented':
      api.notImplemented(request, response);
      break;
    default:
      api.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
