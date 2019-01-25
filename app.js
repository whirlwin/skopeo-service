const http = require("http");
const url = require("url");
const childProcess = require("child_process");

const port = process.env["PORT"] || 3000;

const server = http.createServer((req, res) => {
    try {
        if (req.url.startsWith("/inspect")) {
            skopeoInspect(url.parse(req.url, true).query).then(result => {
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
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end("Command not found");
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

function skopeoInspect(options) {
    const cmd = `
        skopeo inspect \
            --tls-verify=${(options["tls-verify"] === 'true')} \
            --creds="${options['creds']}" \
            ${options["image"]}`;
    return new Promise((resolve, reject) => {
        childProcess.exec(cmd, (err, stdout, stderr) => {
            if (!err) {
                resolve({
                    cmd: cmd,
                    err: null,
                    stdout: JSON.parse(stdout),
                    stderr: stderr
                });
            } else {
                reject({
                    cmd: cmd,
                    err: null,
                    stdout: stdout,
                    stderr: stderr,

                });
            }
        });
    });
}

server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
