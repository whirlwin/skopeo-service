skopeo-service
--------------

A web service for invoking Skopeo. Currently, only `inspect` is supported with limited parameters.

# Usage

## Run with Docker

```
docker run -e PORT=3001 whirlwin/skopeo-service 
```

## Configuration

### Environment variables

- `PORT` (default: `3000`)

## Endpoints

### GET /inspect

#### Query parameters

- `tls-verify`
- `creds`
- `image`

# More info

Read more about Skopeo here: https://github.com/containers/skopeo
