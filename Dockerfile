FROM nikolaik/python-nodejs:latest

RUN apt-get update && \
  apt-get install -y \
  neofetch \
  chromium \
  ffmpeg \
  wget \
  mc \
  imagemagick && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .
RUN mkdir /mdxcaa
WORKDIR /mdxcaa
COPY . /mdxcaa
ENV TZ=Asia/Jakarta
RUN pwd
RUN ls

EXPOSE 5000

CMD ["npm", "start"]