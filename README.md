
# Portfolio Project

A portfolio project with an admin panel where new projects can be uploaded or edited after users log in. It is built using React for the frontend, Cloudinary for image storage, Firebase for authentication, Nodemailer for email functionality, and MongoDB with Express.js for the backend server.

## Features

- **User Authentication:** Users can sign up, log in, and log out securely using Firebase authentication.
- **Admin Panel:** Authenticated users have access to an admin panel where they can upload new projects or edit existing ones.
- **Cloudinary Integration:** Project images are stored securely on Cloudinary.
- **Contact Page:** Users can send messages via email using the contact page, which is powered by Nodemailer.
- **Backend Server:** The backend server is built with Express.js and MongoDB, providing APIs for managing projects, user authentication, and handling contact form submissions.

## Technologies Used

- React
- Cloudinary
- Firebase Authentication
- Nodemailer
- MongoDB
- Express.js

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/danaciobo/jon-portfolio.git

2. **Client Dependencies**

Navigate to the client directory and
Install dependencies: 
```bash
cd jon-portfolio/client
npm install
```

3. **Server Dependencies**

Navigate to the server directory and
Install dependencies:

```bash
cd jon-portfolio/server
npm install
```

4. **Configure Backend Environment Variables**

   - Create a file named `.env` in the server directory.
   - Add the following environment variables to the `.env` file, replacing placeholders with your actual values:

  ```bash
  PORT=
  CLOUD_NAME=
  API_KEY=
  API_SECRET=
  CLOUDINARY_URL=
  USER_EMAIL=
  USER_EMAIL_PASSWORD=
  RECEIVER_EMAIL=
  MY_DB_URL=
  ```

## Usage

**Start Development Server (Client)**

  ```bash
  cd jon-portfolio/client
  npm start
```

**Start Backend Server**

```bash
cd jon-portfolio/server
npm start
```

**Access Application**

Open your web browser and navigate to http://localhost:3000.
You can sign up or log in to access the admin panel, upload projects, and send messages.


