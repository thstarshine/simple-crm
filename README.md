# simple-crm

A simple CRM built with [Fastify](https://github.com/fastify/fastify) and [React](https://github.com/facebook/react).

-   Test data is auto generated when the server boots up.
-   Each customer has `id`, `name`, `phone`, `address`, `email`, `status`, `createdAt` and can have as many `notes` as possible.
-   Schema: [Customer](./server/models/customer.js), [CustomerNote](./server/models/customerNote.js)
-   Click `Edit` button to edit customer's `status` and `note` (add/modify/delete).
-   Using the header column to filter or sort the customer list.

## Prerequisite

-   Node.js 10.x+
-   Yarn 1.17+
-   MariaDB 10.x+

## API documentation

Refer to https://crmlab.zapto.org/documentation for swagger documentation.

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
