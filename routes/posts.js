var express = require('express');
const userAuth = require('../middleWares/userAuth');
const { addImage, createPost, getBlogData, getFullBlog, getYourPosts, deletePost } = require('../controllers/postController');
const multer  = require('multer')
var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"_"+file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/add-image',userAuth,upload.single('image'),addImage);
router.post('/create-post',userAuth,upload.single('image'),createPost);
router.get('/getblog-data',userAuth,getBlogData);
router.get('/detailed-page/:productId',userAuth,getFullBlog);
router.get('/my-posts',userAuth,getYourPosts);
router.delete('/delete-post/:id',userAuth,deletePost);

module.exports = router;
