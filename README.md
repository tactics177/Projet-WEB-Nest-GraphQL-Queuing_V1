# Projet-WEB-Nest-GraphQL-Queuing_V1

## Group:

- Gregoire Lequippe
- Ali Loudagh
- Nahel Kini
- Roman Sabechkine

## Stack and Technologies

This application uses the following technologies:

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- **React**: A JavaScript library for building user interfaces.
- **NestJS Passport Authentication**: Authentication middleware for NestJS applications.
- **NestJS WebSockets**: Provides real-time, bidirectional, and event-based communication.
- **BullMQ**: A premium job queue for handling distributed jobs and messages in NodeJS.
- **GitHub Actions**: Used for Continuous Integration and Continuous Deployment (CI/CD).
- **Microsoft Azure**: The app is deployed on Azure, using Azure Cache for Redis for caching purposes.

## Local Setup

To run the application locally, follow these steps:

1. **Create Environment File**:
   - Create a `.env.local` file inside the `front` folder with the following content:
     ```env
     REACT_APP_API_URL=http://localhost:3000
     REACT_APP_GRAPHQL_URL=http://localhost:3000/graphql
     REACT_APP_SOCKET_URL=http://localhost:3000
     ```

2. **Setup and Run the Application**:
   ```bash
   $ cd Projet-WEB-Nest-GraphQL-Queuing_V1
   $ docker-compose up
   ```

## The app is deployed in Azure
front: https://efreichatappfront.azurewebsites.net/


back: https://efreichatapp.azurewebsites.net/
