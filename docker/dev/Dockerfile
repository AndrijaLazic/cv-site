FROM node:22-bookworm-slim

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

# Rename the existing node user/group (uid/gid 1000 in base image) to devuser
RUN usermod -l devuser -d /home/devuser -m node \
    && groupmod -n devuser node \
    && echo "devuser ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/devuser \
    && chmod 0440 /etc/sudoers.d/devuser

WORKDIR /workspace
RUN chown devuser:devuser /workspace

USER devuser

ENV SHELL=/bin/bash
