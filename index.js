const express = require('express');

const Apollo = require('./Apollo.js');

const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log("Server up and running.");
    Apollo.Apollo();
});