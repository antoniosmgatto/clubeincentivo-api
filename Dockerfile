FROM node:10.15.0-stretch-slim

ENV DEBIAN_FRONTEND noninteractive

### Configura o apt e instala os pacotes necessários ###
RUN apt-get update \
    && apt-get install apt-transport-https -y --no-install-recommends apt-utils \
    && apt-get update \
    && apt-get install -y build-essential \
    locales \
    git \
    && rm -rf /var/lib/apt/lists/*

### Set locale ###
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen en_US.UTF-8 && \
    dpkg-reconfigure locales && \
    /usr/sbin/update-locale LANG=en_US.UTF-8
ENV LC_ALL en_US.UTF-8

### Setando path do código como diretório de trabalho ###
WORKDIR /app

COPY package.json .
RUN npm install --quiet

### Copiando projeto para dentro do docker ###
COPY . .

EXPOSE 3000