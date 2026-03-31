FROM node:25.8.2-bookworm-slim
ARG NPM_VERSION=11.12.1

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
    && rm -rf /var/lib/apt/lists/*

# Keep npm pinned to the requested major version for dev containers
RUN npm install -g npm@${NPM_VERSION}

# Rename the existing node user/group (uid/gid 1000 in base image) to devuser
RUN usermod -l devuser -d /home/devuser -m node \
    && groupmod -n devuser node \
    && echo "devuser ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/devuser \
    && chmod 0440 /etc/sudoers.d/devuser

WORKDIR /workspace
RUN chown devuser:devuser /workspace

USER devuser

ENV SHELL=/bin/bash
