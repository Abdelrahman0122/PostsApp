# PostsApp

PostsApp is a social media application built using Node.js.

## Features

- User registration and authentication
- Create, edit, and delete posts
- Like and comment on posts
- Profile management
- Upload and manage profile pictures
- Email notifications

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi (for input validation)
- Bcrypt (for password hashing)
- Cloudinary (for image upload and management)
- JSON Web Tokens (JWT) (for authentication)
- Multer (for file uploading)
- Nodemailer (for sending email notifications)

## Getting Started

To get started with the PostsApp application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdelrahman0122/PostsApp.git
## Install the dependencies

To install the dependencies for the PostsApp application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdelrahman0122/PostsApp.git

## Set up the environment variables:
- Create a .env file in the root directory of the project.
- Define the following environment variables in the .env file:
- PORT - The port number on which the server will run.
- MONGODB_URI - The URI for connecting to the MongoDB database.
- JWT_SECRET - The secret key used for JWT token generation.
- CLOUDINARY_NAME - Your Cloudinary cloud name.
- CLOUDINARY_API_KEY - Your Cloudinary API key.
- CLOUDINARY_API_SECRET - Your Cloudinary API secret.
- EMAIL_USERNAME - Your email account username.
- EMAIL_PASSWORD - Your email account password.
- EMAIL_HOST - The SMTP host for your email account.
- EMAIL_PORT - The SMTP port for your email account

# PostsApp API Documentation

This repository contains the backend code for the PostsApp, a social media application built with Node.js.

## API Endpoints

### Post Routes

- `POST /addPost`: Create a new post.
- `GET /getAllPosts`: Get all posts.
- `GET /getPostsByUser/:id`: Get posts by a specific user.
- `GET /getSinglePost/:id`: Get a single post by its ID.
- `PUT /updatePost/:id`: Update a post by its ID.
- `DELETE /deletePost/:id`: Delete a post by its ID.
- `GET /getPrivatePosts`: Get private posts.
- `POST /likePost/:id`: Like a post by its ID.

### Comment Routes

- `POST /addComment`: Add a new comment.
- `GET /getAllComments/:id`: Get all comments for a specific post.
- `PATCH /editComment/:id`: Edit a comment by its ID.
- `DELETE /deleteComment/:id`: Delete a comment by its ID.

### Auth Routes

- `POST /signUp`: User sign-up.
- `POST /signIn`: User sign-in.
- `POST /logout`: User logout.
- `POST /changePassword`: Change user password.
- `POST /forgetPassword`: Request password reset.
- `POST /resetPassword`: Reset user password.


 
