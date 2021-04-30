<div align="center">

  [![Spectrum](./client/public/logo192.png)](https://duplexx.herokuapp.com/)

  ### Duplex

  A dual identity messenger supporting instant text messaging, video call, and voice call.

</div>

## Docs

- [Contributing](#contributing)
  - [Codebase](#codebase)
    - [Technologies](#technologies)
    - [File Structure](#file-structure)
    - [Code Style](#code-style)
  - [Pre-dev setup](#pre-dev-setup)
  - [Local development](#local-development)
- [Technical](#technical)
  - [Deployment](#deployment)
  - [API](#api)

## Contributing

### Codebase

#### Technologies

General:

- **Full-stack TypeScript**: We use TypeScript for both frontend and backend.
- **Node.js**: Server runtime.

Frontend:
- **React**: Frontend PWA. 
- **Simple-Peer**: Core of video call and voice call. 
- **Styled-Component**: CSS-in-JS library. 
- **Material-ui**: Material Components for some general UI. 

Backend
- **Express**: Framework for building API.
- **MongoDB**: Data storage, with mongoose to perform interaction.
- **Socket.io**: Core of real time functions e.g. text messenging, video call, voice call. 
- **JsonWebToken**: for user authentication. 


#### File Structure

```sh
duplex/
├── client          # React PWA
├── electron        # Desktop version powered by electron
├── server          # API and Web server
├── .eslintrc.js    # eslint config
├── .gitignore      # git ignore  
├── .prettierignore # prettier ignore
├── .prettierrc.js  # prettier config
├── package.json    # Meta data of this project
└── yarn.lock       # dependencies
```

#### Code Style

Prettier and Eslint is used for code formatting. Formatting rules are defined in .eslintrc.js and .prettierrc.js
Below is the setup precess on VSCode.

1. Install Prettier extension on VSCode
2. Set Prettier as default formatter(ctrl + shift + p ">format document" and choose prettier as default fomatter)

In general, CamelCase is used for filename and variable naming. Reusable constants are capitalized and in snake_case. 
```js
ExampleFileName
let exampleVariable
const EXAMPLE_CONSTANT
```

### Pre-dev setup

1. clone this repository to local
```
git clone https://github.com/IamMrandrew/duplex.git
```

2. install [Node.js](https://nodejs.org/en/download/)

3. install [Yarn](https://classic.yarnpkg.com/en/docs/install)

4. setup [AWS S3 Bucket](https://aws.amazon.com/tw/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Categories=categories%23storage&trk=ps_a134p000006gXrGAAU&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_HK&sc_publisher=Google&sc_category=Storage&sc_country=HK&sc_geo=CHNA&sc_outcome=acq&sc_detail=aws%20s3&sc_content=S3_e&sc_matchtype=e&sc_segment=490400689170&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Storage|S3|HK|EN|Text&s_kwcid=AL!4422!3!490400689170!e!!g!!aws%20s3&ef_id=Cj0KCQjwsqmEBhDiARIsANV8H3a7_nNqqLZqjTrBME4lUfFCticl5EgFJnTuYU7J1zn9RjaGquWlqw0aAipNEALw_wcB:G:s&s_kwcid=AL!4422!3!490400689170!e!!g!!aws%20s3) for image uploading

5. install project dependencies
```
cd client
yarn install
cd server
yarn install
cd electron
yarn install
```

6. setup environment variables, create `.env` in `./server` with the following config
```
PORT=port-for-the-app-to-listen
DB_URL=mongodb-url
JWT_TOKEN=self-define-token
NODE_ENV=production-or-development
S3_BUCKET_NAME=aws-s3-bucket-name
```

### Local development

#### client
To develop client PWA run
```
cd client
yarn start
```

#### server
To develop the API and Web server run
```
cd server
yarn start
```

#### electron
To develop the desktop version run
```
cd electron
yarn start
```

## Technical

### Deployment

- API & Web server is deployed on Heroku. [Tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- MongoDB cluster is deployed on AWS via [Atlas](https://www.mongodb.com/cloud/atlas).
- Image storage is deployed on AWS S3. [Tutorial](https://devcenter.heroku.com/articles/s3)


### React Frontend

- Frontend routings are in `./client/src/Routes.tsx`
- Reusable components are in `./client/src/components`
- Different page views are in `./client/src/views`
- General form integrity checking schema are in `./client/src/formIntegrity.tsx`
- Commonly used utility functions are in `./client/src/utils.ts`

### API

- restful design is applied.
- api share the same route as web server but starts with the path `/api`
- use `log(message)` function in `./server/utils.ts` to log critical messages with timestamp
- use `sendError(res, code, msgToSend, msgToLog)` function in `./server/utils.ts` to send response and log to console when error occurs
