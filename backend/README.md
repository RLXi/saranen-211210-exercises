# Installation

Run `npm i`

Configure the content of `.env.example` file to match your database credentials, then rename the file `.env.example` --> `.env`

## Notes

Both `cli-v1.js` and `cli-v2.js` include ASCII UI for some basic database queries. You can use them with commands:

run `node cli-v1.js`

run `node cli-v2.js`

## Running the server

run `npm run dev` to start the server with nodemon

Test endpoints with `requests.http` or some more dedicated software like [Postman](https://www.postman.com/)

In order to use `requests.http`, you need an extension. Assuming you are using VS Code editor, install [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension. Then, open the file in the editor, and you should be able to test the endpoints. The endpoints may require some configuration first, though.

`public` directory has simple web UI. Edit the `app.use(express.static("build"));` line in `index.js` to `app.use(express.static("public"));` in order to use it.

`build` directory should have build content from the `frontend`. Build the React app in `frontend` and then copy & paste the content in `frontend/build` directory into the `backend/build` directory.
