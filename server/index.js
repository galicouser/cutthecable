const app = require('./server.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`)
});

module.exports = app;