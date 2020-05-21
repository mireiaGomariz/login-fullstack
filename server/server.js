const server = require("./app");
const { PORT } = process.env;
const port = PORT || 8080;

// server has everything we need from app so we keep our entry point clean

server.listen(port, () => console.log(`Listening to port: ${port}`));
