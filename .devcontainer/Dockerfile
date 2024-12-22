FROM debian:bullseye-slim

ARG USER_NAME=utakata
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

ENV DEBIAN_FRONTEND=noninteractive

RUN groupadd --gid ${USER_GID} ${USER_NAME} \
    && useradd -s /bin/bash --uid ${USER_UID} --gid ${USER_GID} -m ${USER_NAME}

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    zip \
    unzip \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV CURL_CA_BUNDLE /etc/ssl/certs/ca-certificates.crt

# Bunのインストール（utakataユーザーとして）
USER ${USER_NAME}
WORKDIR /workspace
RUN curl -fsSL https://bun.sh/install | bash \
    && echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc \
    && echo 'export PATH=$BUN_INSTALL/bin:$PATH' >> ~/.bashrc \
    && . ~/.bashrc

ENV PATH $BUN_INSTALL/bin:$PATH

RUN export WATCHPACK_POLLING=true
RUN chown ${USER_NAME}:${USER_NAME} /workspace
