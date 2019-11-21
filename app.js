const http = require("http");
const url = require("url");
const inspect = require("./inspect");
const copy = require("./copy");

const port = 3000;


const server = http.createServer((req, res) => {

    const reqUrl = url.parse(req.url, true);

    function handleCommandRequest(command) {
        return command(reqUrl.query).then(result => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.error(err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                err: err
            }));
        });
    }

    try {
        if (reqUrl.pathname === "/inspect") {
            handleCommandRequest(inspect);
        } else if (reqUrl.pathname === "/copy") {
            handleCommandRequest(copy);
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                err: "Command not found"
            }));
        }
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            err: err
        }));
    }
});


server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});

server.timeout = 300000;
