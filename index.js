const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);


// middleware 
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(exp)

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// basic route 
app.get("/v",(req,res)=>{
    res.send('food delivery app backend');
})
app.listen(PORT, ()=>{
    console.log(`server runing on port ${PORT}`);
});