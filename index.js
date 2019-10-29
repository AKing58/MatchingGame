let express = require("express");
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

const expressHbs = require('express-handlebars');

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/',
        defaultLayout: 'main',
        extname: 'hbs'
    })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


let gameRoutes = require('./routes/game');

app.use(express.static(path.join(__dirname, 'public')));

app.use(gameRoutes);
let port = process.end.PORT || 3000;
app.listen(port, () => console.log("Server Ready"));
