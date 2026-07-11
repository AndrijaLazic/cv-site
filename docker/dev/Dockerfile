FROM node:25.8.2-bookworm-slim
ARG NPM_VERSION=11.12.1
ARG RTK_VERSION=v0.43.0

# Install essential development tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    nano \
    curl \
    wget \
    bash-completion \
    sudo \
    ca-certificates \
    gnupg \
    unzip \
    zip \
    jq \
    openssh-client \
    gosu \
    && rm -rf /var/lib/apt/lists/*

# Keep npm pinned to the requested major version for dev containers
RUN npm install -g npm@${NPM_VERSION}

# Install the coding-agent CLIs globally so they are available in every workspace.
RUN npm install -g opencode-ai @openchamber/web

# Install the verified RTK release used by Codex and the OpenCode rewrite plugin.
RUN curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/develop/install.sh \
    | RTK_VERSION=${RTK_VERSION} RTK_INSTALL_DIR=/usr/local/bin sh

# Rename the existing node user/group (uid/gid 1000 in base image) to devuser
RUN usermod -l devuser -d /home/devuser -m node \
    && groupmod -n devuser node \
    && echo "devuser ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/devuser \
    && chmod 0440 /etc/sudoers.d/devuser

WORKDIR /workspace
RUN chown devuser:devuser /workspace
RUN mkdir -p /workspace/node_modules \
    && chown -R devuser:devuser /workspace/node_modules

COPY docker/dev/entrypoint.sh /usr/local/bin/docker-dev-entrypoint
RUN chmod 0755 /usr/local/bin/docker-dev-entrypoint

ENV HOME=/home/devuser \
    CODEX_HOME=/home/devuser/.codex \
    XDG_CACHE_HOME=/home/devuser/.cache \
    XDG_DATA_HOME=/home/devuser/.local/share \
    XDG_STATE_HOME=/home/devuser/.local/state \
    PATH=/home/devuser/.local/bin:/usr/local/bin:/usr/local/sbin:/usr/sbin:/usr/bin:/sbin:/bin \
    SHELL=/bin/bash

ENTRYPOINT ["/usr/local/bin/docker-dev-entrypoint"]
