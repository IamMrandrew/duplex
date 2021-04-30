# Backend - Server Side (API & Web)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the server in the development mode.\
The server will listen on port 3001 by default in local

### `yarn build`

Builds the app for production to the `build` folder.

## File Structure

- RESTful design is applied.
- Api share the same route as web server but starts with the path `/api`
- Use `log(message)` function in `./utils.ts` to log critical messages with timestamp
- Use `sendError(res, code, msgToSend, msgToLog)` function in `./utils.ts` to send response and log to console when error occurs
- Socket.io are modularized in `./socket` with its own middleware and controllers
