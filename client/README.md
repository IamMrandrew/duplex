# Frontend - Client Side

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## File Structure

- Frontend routings are in `./client/src/Routes.tsx`
- Reusable components are in `./client/src/components`
- Different page views are in `./client/src/views`
- State mangement with Context API are in `./client/src/context`
- Axios api calls services are in `./client/src/services`
- General form integrity checking schema are in `./client/src/formIntegrity.tsx`
- Commonly used utility functions are in `./client/src/utils.ts`

## Proxy

We have set up the proxy `"proxy": "http://localhost:3001"` in `package.json` so that we can call our apis with the same url in development and production.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
