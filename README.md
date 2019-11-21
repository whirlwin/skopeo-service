# skopeo-service

Web service for Skopeo. Useful if you don't want to install Skopeo as a binary inside your image, but rather invoke
Skopeo via HTTP.

## Supported endpoints

### /inspect
- Method: `GET`
- Path: `/inspect`
- Query params:
    - `tls-verify`
    - `creds`
    - `image-reference` 

Example response:

```
{
    "cmd": "\n        skopeo inspect             --tls-verify=false             --creds=\"asd\"             docker://gcr.io/kaniko-project/executor:debug",
    "err": null,
    "stdout": {
        "Name": "gcr.io/kaniko-project/executor",
        "Digest": "sha256:b240a886b81e3d52ed53e4fc1047ee47860de4f1acd2781c21abc916742bc356",
        "RepoTags": [
            "v0.7.0"
        ],
        "Created": "2018-12-11T23:03:46.409797285Z",
        "DockerVersion": "18.06.1-ce",
        "Labels": null,
        "Architecture": "amd64",
        "Os": "linux",
        "Layers": [
            "sha256:314af96ef456b0870c27a1290e89f713829588d5147c4421d85f913b5648c02f"
        ]
    },
    "stderr": ""
}
```

### /copy
- Method: `GET`
- Path: `/copy`
- Query params:
    - `src-tls-verify`
    - `dest-tls-verify`
    - `src-creds`
    - `dest-creds`
    - `src-image-reference`
    - `dest-image-reference`

Example response:

```
Getting image source signatures\nCopying blob sha256:4fe2ad\foobar
```

