FROM node:16.14.2-alpine3.15
WORKDIR aap
COPY . .


EXPOSE 3000

CMD ["npm","start"]
