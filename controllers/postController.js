const POST = require('../models/postModel')

const addImage = async(req,res)=>{
  console.log(req.file)
  res.status(200).json(`images/${req.file.filename}`)
}

const createPost = async(req,res)=>{
  try {
    const userId = req.user.id
    const { text,title,image} = req.body

    if(!text || !title || !image) {
      return res.status(400).json({ message:'all fields required' })
    }

    const newPost = POST({content:text,title:title,imagePath:image,author:userId})
    await newPost.save()

    return res.status(200).json({message:'Post created successfully'})
  } catch (error) {
    return res.status(500).json({ messaga:error.message || 'Internal server error'})
  }
}


const getBlogData = async(req,res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = 5; 
  const skip = (page - 1) * limit;
  try {
    const totalBlogs = await POST.countDocuments();
    const blogs = await POST.find().populate('author','name email _id').skip(skip).limit(limit);
    const totalPages = Math.ceil(totalBlogs / limit);

    res.status(200).json({
      success:true,
      message:'New feeds updated',
      blogs,
      totalPages 
    })

  } catch (error) {
    return res.status(500).json({ messaga:error.message || 'Internal server error'})
  }
}


const getFullBlog = async(req,res)=>{
  try {
    const {productId} = req.params
    const BlogData = await POST.findById(productId).populate('author','name')

    if(!BlogData){
      return res.status(404).json({ message:'file not found'})
    }

    res.json({message:'Blog details fetched', data: BlogData})
    
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}


const getYourPosts = async(req,res)=>{
  const userId = req.user.id
  try {
    const posts = await POST.find({ author: userId }).populate('author');
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching posts', error });
  }
}


const deletePost = async (req, res) => {
  try {
    const userId = req.user.id; 
    const postId = req.params.id; 


    const post = await POST.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this post' });
    }

    await POST.findByIdAndDelete(postId);

    return res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};



module.exports = { addImage,createPost,getBlogData, getFullBlog, getYourPosts, deletePost }