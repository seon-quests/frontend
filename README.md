# seon-quests

## Features

- **React 16** with Redux, and react-router
- Prettier/Eslint


### Frontend Development

To run using npm:

```
cd front
npm install
npm start
```

This should redirect you to http://localhost:3000

## Project Layout

```
frontend
└── public
└── src
    ├── assets
    │   └── css
    │   └── fonts
    │   └── img
    │   └── plugins
    │   └── scss
    ├── components
    │   └── Buttons/Timers/Tabs/etc
    ├── extensions
    │   └── protectedRoutes.js
    ├── layouts      # templates for different part of the app
    │   └── Admin.js
    │   └── Auth.js
    │   └── Player.js
    ├── services     # useful CRUD helpers
    ├── views
    │   └── admin
    │   └── examples    # some pages from the default template to copy-paste from
    │   └── player
    ├── index.tsx   # entrypoint
    └── routes.tsx     # handles routing
```
