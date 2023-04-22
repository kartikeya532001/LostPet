FROM node:16.14.2-alpine3.15
WORKDIR aap
COPY . .
RUN npm cache clean -f
RUN npm i
RUN npm i react-router-dom@5.3.3
RUN npm install react-icons --save
RUN npm i node-sass
RUN npm i framer-motion
RUN npm i react-dotenv
RUN npm rebuild node-sass
EXPOSE 2000


CMD ["npm","start"]
