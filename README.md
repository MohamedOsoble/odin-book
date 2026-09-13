# Welcome to my Odin-Book!

This is a web application I built using React for the frontend and Express for the backend. It is somewhat a social media / messaging board application. It is deployed [Here](https://odinbook.mohzzy.com) on my Homelab using Docker. You can either create an account to register to explore the application or click Continue as Guest which will log you in as the default guest user.

## Technology Stack:

### Frontend

- React
- React Router
- Tailwindcss
- Vite
- DaisyUI
- SocketIO Client

### Backend

- Express for running the server, SSR & API routes
- Postgresql & Prisma for the Db
- Passport and JWT for Login & Auth
- SocketIO for Live messaging

### Deployment

- Docker
- Nginx Proxy Manager
- Cloudflare

## Features

### Posts:

- Create, comment, delete and like posts.
- Sort by Popularity, recency or only from users you follow.
- Limited to 300 Characters to keep posts short and easy to digest.

#### Missing/WIP/Not available:

- Allow posting of media

### Profile

- Edit name, biography and date of birth
- Allow custom images for profile avatars
- View Posts, comments and followers/following of user

#### Missing/WIP/Not available:

- Privacy feature
- No option to change/reset password.
- Blocking users feature

### Messaging

- Message friends in real time
- Online/offline indicator
- Message friends even if they're not online
- Timestamps of when messages were sent.

### Missing/WIP/Not available:

- Notification on new message
- Notification when you receive messages while offline.
- Delete/Edit already sent messages.
- Read indicator for messages that have been received & read.

### Register

- Register with email & password
- Registration failure messages with reason why

### Missing/WIP/Not available:

- Any sort of registration/login thats not email/password combination. (Seems to be overkill for this)

### Known bugs/issues

- Currently, Logout does not redirect to homepage after logging out without an error.

---

Built with ❤️ using React Router.
