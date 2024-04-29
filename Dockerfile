FROM node:latest
LABEL authors="p4rth"

# copy all source files to the container
# COPY package.json ~/app/
# COPY src ~/app/src
# or
COPY . ~/app/

# cd into the app folder
WORKDIR ~/app

# install all dependencies
RUN npm install

# build the project
RUN npm run build

EXPOSE 3000
# start the app using this command
CMD ["npm","run","start"]
