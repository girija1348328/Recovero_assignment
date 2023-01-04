const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const cors = require('cors')
const { default: mongoose } = require('mongoose');
const app = express();
app.use(cors())

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://linagodbole99:dAix1EtU6C6yxJDR@cluster0.oip3eje.mongodb.net/recoveroAssignGirija", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});