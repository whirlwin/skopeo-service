const childProcess = require("child_process");

function copy(options) {
    const cmd = `
        skopeo --insecure-policy=${(options["insecure-policy"] === "true")} \
            --debug=${(options["debug"] === "true")} \
            copy \
            --src-tls-verify=${(options["src-tls-verify"] === 'true')} \
            --dest-tls-verify=${(options["dest-tls-verify"] === 'true')} \
            --src-creds="${options["src-creds"]}" \
            --dest-creds="${options["dest-creds"]}" \
            ${options["src-image-reference"]} \
            ${options["dest-image-reference"]} \
    `;
    return new Promise((resolve, reject) => {
        childProcess.exec(cmd, (err, stdout, stderr) => {
            if (!err) {
                resolve({
                    cmd: cmd,
                    err: null,
                    stdout: stdout.substring(0,1000),
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

module.exports = copy;
