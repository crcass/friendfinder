const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'resources')));

require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
