# simple-crm

A simple CRM built with [Fastify](https://github.com/fastify/fastify) and [React](https://github.com/facebook/react).

-   Test data is auto generated when the server boots up.
-   Each customer has `id`, `name`, `phone`, `address`, `email`, `status`, `createdAt` and can have as many `notes` as possible. [Customer Schema](./server/models/customer.js) [CustomerNote Schema](./server/models/customerNote.js)
-   Click `Edit` button to edit customer's `status` and `note` (add/modify/delete).
-   Using the header column to filter or sort the customer list.

## API documentation

Refer to /documentation for swagger documentation.

## Run

### Run server

`yarn start-server`

### Run front end

`yarn start`

## Test

### Run test for server

`yarn test-server`

### Run test for front end

`yarn test`
