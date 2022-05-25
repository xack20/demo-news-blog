const express = require('express');
const multer = require('multer');
const path =  require('path');

const App = express();


const bodyParser = require('body-parser');
App.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),"public/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

App.use(express.static('public'));




App.post( '/upload', upload.array("news-img"), (req,res) => {
    // console.log(req.body['news-img-name']);
    res.send('ok');
});

App.listen(3005, () => {
    console.log('Server is running on port 3005');
});
 