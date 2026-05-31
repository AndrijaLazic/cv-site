# Stage Deployment

This folder contains the production deployment path for the VPS.

- `Dockerfile` builds the TanStack Start app in multiple stages, keeps only production dependencies in the final image, and generates `.output/server/index.mjs` so the container starts with the required runtime command.
- `docker-compose.yml` runs a single `tanstack-app` container, binds it to `127.0.0.1:3000`, restarts it automatically, and adds basic container hardening.
- `nginx/tanstack-app.conf` is the host-level reverse proxy config for `YOUR_DOMAIN.com`, forwarding traffic to the local container port.
- `../../deploy.sh` is the only deployment entrypoint used by CI: it rebuilds the container, starts it, and prunes dangling images.
- `../../.github/workflows/deploy.yml` stays intentionally minimal and only checks out the repo, makes `deploy.sh` executable, and runs it on the self-hosted runner.

Replace `YOUR_DOMAIN.com` before using the Nginx config on the server.
