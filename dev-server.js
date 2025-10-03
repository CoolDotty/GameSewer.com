const browserSync = require('browser-sync').create();
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
  browserSync.init({
    proxy: `localhost:${PORT}`,
    files: [
      path.join(__dirname, '*.html'),
      path.join(__dirname, '*.css'),
      path.join(__dirname, '*.js'),
    ],
    open: false,
    notify: true,
    port: 3001,
  });
});
