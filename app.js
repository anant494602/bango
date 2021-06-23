const express= require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator =require('express-validator');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes =require('./routes/product')

const app= express();




//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({
  extended: true
}));

//middleware
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('DB connected')
}).catch((error)=>{
    console.log(`Following error occured:${error}`)
})

const port = process.env.PORT || 8000
console.log('working');
if(process.env.NODE_ENV ==='production'){
    console.log('working2');
    app.use(express.static('client/build'))
}

app.listen(port,()=>{
    console.log(`node server is running at port ${port}`)
})





