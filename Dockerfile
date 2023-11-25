FROM node

WORKDIR /bank_frontend

ENV PATH /bank_frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts --silent
RUN npm install react-redux --silent
RUN npm install @reduxjs/toolkit --silent
RUN npm install redux --save --silent

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]