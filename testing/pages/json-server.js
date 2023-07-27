const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('fixture/data-server.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = 7000;
server.listen(port, () => {
  console.log(`Mock server running on port ${port}`);
});
