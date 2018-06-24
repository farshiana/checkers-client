Checkers-client
=========

A small checkers game made with React, Redux, React-material-ui and socket.io-client. Offline mode hasn't been implemented yet. Game logic comes from my project checkers-logic. Server side was made with MongoDB & Node.js. The project is hosted on ec2 (with pm2 & nginx), and currently running at https://checkers.farshiana.com.

### `npm install`

Installs project dependencies

### `npm start`

Runs the app in the development mode

### `npm run lint`

Runs ESLint

### `npm run build`

Builds the app for production inside the `build` folder.

### `ln -sf ../../hooks/pre-commit pre-commit` inside checkers-client/.git/hooks

Creates a symlink for the pre-commit hook

### sudo chmod +x .git/hooks/pre-commit

Makes hook executable
