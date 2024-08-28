# Project Overview

This is a Library Management system built using microservices connected with gRPC.
The project consists of three directories:

- **Main-service** (acting as API Gateway and gRPC client)
- **User-service** (microservice for users, acting as the gRPC server)
  - Authentication and user profile settings are handled here.
- **Book-service** (microservice for books, acting as the gRPC server)
  - This service is responsible for book management, including CRUD operations.

I also wanted to include two more services: an Admin service and a Borrow service.

In the `user-service` and `book-service` directories, you can find a `server.ts` file. In the `main-service` directory, there is a `client.ts` file.

The user and book services contain two main directories:

- **Business-layer**
- **Persist-layer**

## Request Flow

The request flow is as follows:

- HTTP requests coming from outside hit the `client.ts` in the `main-service`.
- Then, using gRPC, they send requests to the servers.
- The request then goes through the **controller layer**, then the **business layer**, and finally the **persist layer**.

The database used in this project is MySQL.  
The authentication mechanism uses JWT and is implemented through the headers of the API calls.

## Project Setup

1. Clone the code.
2. Run `docker-compose build`.
3. Run `docker-compose up -d`.

Please wait until you see :

express is listening on port 3000 .

Your user server has started on port 50051 .

Your user server has started on port 50052 .

### To Run the Code Locally

1. Create your own `.env` file.
2. Run `npm install`.
3. Open three separate terminals.
4. Navigate to each of the three services in each terminal (`user-service`, `book-service`, `main-service`).
5. Run `npm run user-server`, `npm run book-server`, and `npm run main-server` in each terminal to ensure the services are up on the following ports:
   - 3000 (main)
   - 50051 (user)
   - 50052 (book)
6. Send requests to port 3000 and test the app.

## Challenges

1. At the beginning of the project, I had no idea what microservices were, nor what gRPC was. I researched to understand these concepts and ended up designing three separate Laravel projects as my services: `user-service`, `book-service`, and `admin-service`. The reason I chose Laravel was that, given the short time frame and the need to learn a new concept, I could write code faster with it.

I dockerized each project, set up the test environment, and developed APIs for users. Here, you can see the incomplete code:

- [https://github.com/20parastesh01/lib-manager](https://github.com/20parastesh01/lib-manager)

I still had no idea how I was going to use gRPC and connect these services. Finally, when I started to dive into the implementation of gRPC in Laravel... yeah... I realized Laravel can only act as a client, not the server! The bad news was that I misunderstood the roles of client and server—I thought Laravel was the server, exactly the opposite of what it actually was!

At that point, I decided to use Node.js as a client, which I mistakenly thought was the server. As I became more familiar with the concepts of server and client, I realized my mistake. I searched to see if there was a way to use a Laravel project as a server. I found someone who handled it using goRunner: [https://dev.to/khepin/building-a-grpc-server-in-php-3bgc](https://dev.to/khepin/building-a-grpc-server-in-php-3bgc).

All the documentation stated that it is not possible to use PHP as a gRPC server. This solution was seen by fewer than 10 people, and I was sure I would face challenges—who could I have asked for help in that case?

It was at this moment that I decided to restart the project, even though I only had two days left! I started the Node.js TypeScript projects. I had two main resources to handle the gRPC server and client in Node.js:

- [https://medium.com/@satishios25/grpc-communication-between-micro-services-in-node-js-express-5a5c31ff8b6b](https://medium.com/@satishios25/grpc-communication-between-micro-services-in-node-js-express-5a5c31ff8b6b)
- [https://www.youtube.com/watch?v=0cxEVcALoxc](https://www.youtube.com/watch?v=0cxEVcALoxc)

2. I had problem finding a good approach for using auth middleware in microservices while they are connected with gRPC. One option was to use user sevice as both the server for user service and as the client for all of the services. At the end I decided to send requests to user server from the client to authenticate the user. I am still not sure which one is a better approach.

3. A big challenge I faced was that after dockerizing the project, I received this error from gRPC when sending a signup request: `"length" is outside of buffer bounds.` I didn’t have this problem when running my tests locally.

So, I tried increasing the gRPC response and request length:

```json
"grpc.max_receive_message_length": -1,
"grpc.max_send_message_length": -1
```

It seemed like -1 meant unlimited, but I also tried other values, yet the problem persisted. I even considered just stringifying the payload instead of using JWT, but the problem still remained! Therefore, I was not able to send requests when Docker Compose was up.
Finally, by changing the Node.js version in the Dockerfiles and using a non-Alpine image, the problem was fixed.

4. After a while, I faced aother challenge with Docker Compose:
   For some reason, database initialization was taking more time, so when the services were about to start, the databases hadn't been fully initialized yet. I tried adding health checks for the database services in docker-compose.yaml file.

During the project, I encountered questions like: Should I use a single Git repo or multiple repos, one for each project? Well, a monorepo seemed easier to handle and share. I also searched for the most common approaches, and it turned out that a monorepo was the most common.
