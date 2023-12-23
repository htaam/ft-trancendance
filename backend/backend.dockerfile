FROM node:lts-alpine

#COPY . /app

WORKDIR /app

# Set the Yarn registry to the default public registry
#RUN yarn config set registry https://registry.yarnpkg.com/

RUN apk update && apk upgrade
RUN apk update node
EXPOSE 4000


RUN yarn cache clean --force
#RUN yarn remove ts-loader webpack

# Install the dependencies listed in package.json
RUN yarn install

ENTRYPOINT [ "/bin/sh", "-c", "yarn && yarn add axios@^0.21.4 @nestjs/cli && yarn run start:dev" ]