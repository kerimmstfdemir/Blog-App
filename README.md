## Blog-App

* In this project, a Blog App. was developed in the React environment.
* Google Firebase is used for backend operations such as Login and Register.
* Also, Firebase Realtime Database was used for the user's operations such as posting, deleting, editing and commenting.
* You can access the live version of the project from the following link.
  https://blog-app-8zrv.onrender.com/

## Project Skeleton

```
Blog-App (main folder)
|
├── README.md 
├── node_modules
├── LICENSE
├── .gitignore
├── public
│      └── index.html
├── src
|    ├───assets
|    │     └── images
│    ├── authentication
│    │     └── firebase.js
|    ├── components
|    │     ├── EditUserPost.jsx
|    │     ├── Footer.jsx
|    │     ├── Navbar.jsx
|    │     ├── NavbarAfterLogin.jsx
|    │     ├── Posts.jsx
|    │     └── UserPosts.jsx
|    ├── pages
|    │     ├── home
|    │     │     ├── Home.jsx
|    │     │     ├── Home.scss
|    │     │     └── NewPost.jsx
|    │     ├── login
|    │     │     ├── ForgotPassword.jsx
|    │     │     ├── login.css
|    │     │     └── Login.jsx
|    │     ├── postDetails
|    │     │     ├── comments.css
|    │     │     ├── Comments.jsx
|    │     │     └── PostDetails.jsx
|    │     ├── profileInfos
|    │     │     └── ProfileInfos.jsx
|    │     └── register
|    │           └── Register.jsx
|    ├── redux
|    │     ├── app
|    │     │     └── store.jsx
|    │     └── features
|    │           ├── loginInfoSlice.jsx
|    │           ├── postsSlice.jsx
|    │           └── registerSlice.jsx
|    ├── router
|    |      ├── AppRouter.jsx
|    |      └── PrivateRouter.jsx
│    ├── App.js
│    ├── App.css
│    ├── index.js
│    └── index.css
├── package.json
├── .env
└── yarn.lock
```