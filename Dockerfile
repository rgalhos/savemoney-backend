FROM node:lts-alpine

COPY . /opt/savemoney
WORKDIR /opt/savemoney

RUN npm ci
RUN npm run build
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/opt/savemoney/docker-entrypoint.sh"]
