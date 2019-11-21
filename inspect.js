const childProcess = require("child_process");

function inspect(options) {
    const cmd = `
        skopeo inspect \
            --tls-verify=${(options["tls-verify"] === 'true')} \
            --creds="${options["creds"]}" \
            ${options["image-reference"]}`
    ;
    return new Promise((resolve, reject) => {
        childProcess.exec(cmd, (err, stdout, stderr) => {
            try {
                parsedStdout = JSON.parse(stdout);
            }catch (e) {
                parsedStdout = {};
                console.error(e);
            }
            if (!err) {
                resolve({
                    cmd: cmd,
                    err: null,
                    stdout: parsedStdout,
                    stderr: stderr
                });
            } else {
                reject({
                    cmd: cmd,
                    err: err,
                    stdout: stdout,
                    stderr: stderr,

                });
            }
        });
    });

}

module.exports = inspect;

