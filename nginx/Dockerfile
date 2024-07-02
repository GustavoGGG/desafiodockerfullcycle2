FROM nginx:1.15.0-alpine

ENV DOCKERIZE_VERSION v0.7.0

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf
