const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;
  console.log("ini method", method);

  if (url === "/") {
    if (method === "GET") {
      response.end("<h1>Hello GET!</h1>");
    }

    if (method === "POST") {
      let body = [];
      let data;

      request.on("data", (chunck) => {
        body.push(chunck);
      });

      request.on("end", () => {
        console.log(body);
        data = Buffer.concat(body).toString();
        console.log(data);
        const { name } = JSON.parse(data);
        response.end(`<h1>Hai, ${name} POST!</h1>`);
      });
    }

    if (method === "PUT") {
      response.end("<h1>Bonjour PUT!</h1>");
    }

    if (method === "DELETE") {
      response.end("<h1>Salam DELETE!</h1>");
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end("<h1>Halo! Ini adalah halaman about</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
      });
    } else {
      response.end(
        `<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`
      );
    }
  } else {
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan padat http://${host}:${port}`);
});
