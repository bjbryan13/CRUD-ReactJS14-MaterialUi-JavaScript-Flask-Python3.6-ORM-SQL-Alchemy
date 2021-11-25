FROM node:16

WORKDIR /user/src/app 

COPY ./package.json ./

COPY ./yarn.lock ./

RUN npm install 

COPY . .

EXPOSE 4200

ENTRYPOINT [ "npm" ]

CMD ["start"]