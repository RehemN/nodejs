const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv =require('dotenv');
const path = require('path');

dotenv.config({path:'./.env'});
app.set('view engine','hbs');

const public = path.join(__dirname,'./public');
app.use(express.static('public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
 app.use(express.json());

 
const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
});
db.connect((Error)=>{
    if(Error){
        console.log(Error);
    }
    else{
        console.log('Mysql connected');
    }
}
)
//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, ()=>{
    console.log("port 5000");
}
)