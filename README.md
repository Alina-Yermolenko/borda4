# Project Title

"Boarda4"

## Description

This is an application for creating boards and tasks inside them, using MongoDB as database. This service should help regular people to write their stuff and help them to resolve by seeing their tasks on boards.

## Getting Started

### Dependencies

* Express to implement web-server;
* Jsonwebtoken package for jwt authentication; 
* Mongoose as ODM for MongoDB; 
* Morgan is used for logging request details;
* Dotenv modules for configuration; 
* Encoded all users password with bcryptjs. 

### Starting locally

1. Clone the repo
    ```
    git clone https://gitlab.com/alina.yermolenko27/angular_hw.git
    ```

1. `cd angular_hw/angular_board/server`
1. `npm i && npm start`

Great! The server is running. Now about the frontend...
Go back to the root.

1. `cd angular_hw/angular_board/frontend`
1. `npm i && npm start`

Now the frontend is running. Now Borda4 can be used locally

If deploying to remote make sure to change the hostUrl in "frontend/src/config.ts", the default should work for local deployment

## Authors

Alina Yermolenko 