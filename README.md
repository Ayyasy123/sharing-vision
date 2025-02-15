# Sharing Vision Take Home Test
## Run Locally
Clone the project

```bash
  git clone https://github.com/Ayyasy123/sharing-vision
```

Go to the project directory

```bash
  cd inventory
```

## Setup
Before running the `docker-compose` file, make sure you have properly configured the environment variables.

Rename all `.env.example` files to `.env` in the following locations:
- **Root directory**
- **Server folder**
- **Client folder**

## Start the server
Before running the command, make sure you already install docker on you computer.

You can refer to this link for detail about the installation : [Docker Installation](https://docs.docker.com/engine/install/)

You can run the server through this command :
```bash
docker compose up -d
```

After that you can access all frontend via **http://localhost:{*your_port*}** default : **http://localhost:3000**


## Endpoints
All endpoints available in postman collection file. You can see  ```docs``` in server folder. For open the file, you can use [postman](https://www.postman.com/). <br>
To open the collection file, you can follow this step :
```bash
1. open postman
2. open menu file
3. choose the collection file in docs folder
4. run the server and you can try the endpoint via postman.
```

## Frontend Pages
After the application is running, you can access the main frontend pages:
- **All Posts**: http://localhost:3000/dashboard/all-posts
- **Add New Post**: http://localhost:3000/dashboard/add-new
- **Preview Post**: http://localhost:3000/dashboard/preview
