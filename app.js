const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findById('6770e6847474be1e82e3b437').then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://impk1103:pk339900@cluster0.yqcmj.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
   .then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Max',
                email: 'max@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    console.log("connected!!!");
    app.listen(8000);
}).catch(err => console.log(err));