const express = require('express');
const multer = require('multer');
const path =  require('path');

const App = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),"public/images/"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })


App.use(express.static('public'));

App.post( '/upload', upload.array("news-img",10), (req,res) => {
    console.log(req.file);
    res.send('ok');
});

App.listen(3005, () => {
    console.log('Server is running on port 3005');
});
 