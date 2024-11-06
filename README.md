# Blog API

A simple blog API built with Node.js, Express, and MongoDB. This application allows users to create, view, update, and delete blog posts. It also includes a search functionality and a responsive front-end.

## Features

- Create a new blog post
- View all blog posts
- View a single blog post
- Update an existing blog post
- Delete a blog post
- Search for blog posts
- Responsive front-end design
- a very simple Auth-system

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templates)
- CSS (Cascading Style Sheets)

## Setup and Installation

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/blog-api.git
cd blog-api
```

2. Install the dependencies:

```sh
npm install
```

3. Create a 

.env

 file in the root directory and add the following environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_session_secret
PORT=3000
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `JWT` with a secret key for session management.

4. Start the server:

```sh
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Create a Post

- **URL:** `/posts`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Post Title",
    "body": "Post Body"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "post_id",
    "title": "Post Title",
    "body": "Post Body",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### View All Posts

- **URL:** `/posts`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "_id": "post_id",
      "title": "Post Title",
      "body": "Post Body",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```

### View One Post

- **URL:** `/posts/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "_id": "post_id",
    "title": "Post Title",
    "body": "Post Body",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Update a Post

- **URL:** `/posts/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "body": "Updated Body"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "post_id",
    "title": "Updated Title",
    "body": "Updated Body",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Delete a Post

- **URL:** `/posts/:id`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```

## Front-End

The front-end of the application is built using EJS templates and CSS. The main layout is defined in 

main.ejs

, and individual pages are defined in the 

views

 directory.

### CSS

The CSS styles are defined in the 

styles.css

 file. The main header and hero section styles are defined as follows:

```css
.main {
  padding: 20px 0;
}

/* Hero Section */
.hero-image {
  max-height: 528px;
  filter: drop-shadow(0px 44px 34px rgba(0, 0, 0, 0.25));
  overflow: hidden;
  border-radius: var(--border-radius);
}

/* Main Header */
.header {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 
  "logo button"
  "menu menu";
  padding-top: 10px;
}

@media only screen and (min-width: 768px) {
  .header {
    grid-template-columns: auto 1fr auto;
  }
}
```
