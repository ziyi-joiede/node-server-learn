const http = require('http');

const PORT = 3001;

const serverHandle = require('../app.js');

const server = http.createServer(serverHandle);

server.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});