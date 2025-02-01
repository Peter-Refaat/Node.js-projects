const fs = require("fs");
const url = require("url");
const http = require("http");
const replaceTemplate = require("./modules/replaceTemplate");
const tempOverview = fs.readFileSync("./templates/template-overview.html", "utf-8");
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempAnimal = fs.readFileSync("./templates/template-animal.html", "utf-8");

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(pathname);
  console.log(query);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    let cards = dataObj
      .map((animal) => replaceTemplate(tempCard, animal))
      .join("");
    let output = tempOverview.replaceAll("{%ANIMAL_CARDS%}", cards);
    res.end(output);
  } else if (pathname === "/animal") {
    res.writeHead(200, { "Content-Type": "text/html" });
    let animal = dataObj[query.id];
    let output = replaceTemplate(tempAnimal, animal);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("NO");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000");
});
