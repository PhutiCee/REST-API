# REST API for User and Post Management

This is a RESTful API built with Node.js and MongoDB for managing users and posts. It allows users to register, log in, update profiles, and interact with posts. The API provides endpoints for user authentication, post creation, retrieval, updates, and deletions.

### Features

- **User Registration and Login**: Users can register and log in securely.
- **User Profile Management**: Users can retrieve and update their profile.
- **Post Management**: Users can create, read, update, and delete posts.
- **User Filtering**: Various filters to query users based on email, gender, and other parameters.
- **Post and User Lookup**: Fetch posts with associated user information.

## 🚀 Getting Started

### Prerequisites

To get started, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (either locally or through a cloud provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PhutiCee/REST-API.git
   cd REST-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the root of your project and add the necessary environment variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/yourdbname  # MongoDB URI
   JWT_SECRET=your_jwt_secret_key  # Secret key for JWT generation (if used)
   SESSION_SECRET=your_session_secret  # Secret for session management
   PORT=3000  # Port the API will run on
   ```

### Running the Application

1. **Start the server**:

   ```bash
   npm start
   ```

2. The API will now be running on `http://localhost:5000`.

3. **Testing**: You can test the API using a tool like [Postman](https://www.postman.com/) or [Swagger UI](http://localhost:5000/api-docs) (if integrated).

---

## 🛠️ API Endpoints

The API exposes the following endpoints:

### Authentication

- **POST `/api/v1/register`**: Registers a new user.
  **Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "yourpassword",
    "gender": "male"
  }
  ```

- **POST `/api/v1/login`**: Logs in a user and returns a session or token.
  **Body**:

  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

- **GET `/api/v1/profile`**: Retrieves the logged-in user's profile.

- **POST `/api/v1/logout`**: Logs out the user and destroys their session.

### Posts

- **POST `/api/v1/posts`**: Creates a new post.
  **Body**:

  ```json
  {
    "title": "My First Post",
    "content": "This is the content of the post.",
    "status": "published"
  }
  ```

- **GET `/api/v1/posts`**: Retrieves all posts of the logged-in user.

- **GET `/api/v1/posts/{postId}`**: Retrieves a single post by ID.

- **PUT `/api/v1/posts/{postId}`**: Updates a post by ID.
  **Body**:

  ```json
  {
    "title": "Updated Post Title",
    "content": "Updated content of the post",
    "status": "published"
  }
  ```

- **DELETE `/api/v1/posts/{postId}`**: Deletes a post by ID.

### User Filters

- **GET `/api/v1/user-posts`**: Fetches all posts of each user.

- **GET `/api/v1/male-users`**: Retrieves all male users.

- **GET `/api/v1/filtered-email`**: Retrieves users whose emails end with "example.com".

- **GET `/api/v1/user-substring`**: Retrieves users whose emails contain the substring "jay".

- **GET `/api/v1/all-posts-with-user`**: Retrieves all posts with the associated user information.

---

## 🔒 Authentication

This API supports both **session-based authentication** (via cookies) and **JWT tokens** for authenticating users. During registration, a user is created, and upon login, the system returns a session or token that should be used for subsequent authenticated requests.

---

## 💡 API Documentation

This project is documented using **Swagger/OpenAPI**. You can view the API documentation by visiting:

- **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🚧 Development

To contribute to this project, clone the repository and create a new branch. After making your changes, run the tests, commit your changes, and create a pull request.

---

## 🔧 Technologies Used

- **Node.js** for the server-side logic
- **Express** as the web framework
- **MongoDB** for the database (with Mongoose for ODM)
- **JWT** or **Session** for user authentication
- **Swagger/OpenAPI** for API documentation
- **bcrypt** for hashing passwords

---

## 🤝 Contributing

We welcome contributions from everyone! Please feel free to fork the repo, make improvements, and submit pull requests.

### Steps to Contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a new pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📢 Acknowledgments

- [Node.js](https://nodejs.org/) for providing a robust and scalable environment.
- [MongoDB](https://www.mongodb.com/) for providing a flexible, document-oriented NoSQL database.
- [Swagger UI](https://swagger.io/tools/swagger-ui/) for interactive API documentation.
- [Express](https://expressjs.com/) for simplifying API development.
- [bcrypt](https://www.npmjs.com/package/bcrypt) for secure password hashing.
