
import Post from '../models/post';
import User from '../models/user';

//===============CREATE POST===================
export async function create(req, res, next){
    const postData = req.body;
    const userId = req.user._id;

    postData.userId = userId;

    try {
        var post = await Post.create(postData);
    } catch ({message}) {
        return next({
            status: 400,
            message
        })
    }
    res.json(post);

}
//=================GET ALL POSTS===============
export async function getAll(req, res, next){
    try {
        var posts = await Post.find();
    } catch ({message}) {
        return next({
            status: 400,
            message
        })
    }
    res.json({ posts });
}

//==================GET POSTS BY LOGIN=====================
export async function getPostsByUserLogin(req, res, next){
    const { login } = req.params;
    try {
        var user = await User.findOne({ login })
    } catch ({ message }) {
        return next({
            status: 500,
            message
        })
    }

    if(!user){
        return next({
            status: 404,
            message: "User Not Found"
        })
    }

    try {
        var posts = await Post.find({ UserId: user._id});
    } catch ({message}) {
        return next({
            status: 500,
            message
        })
    }

    res.json({ posts });

}

export async function deletePost(req, res, next){
    const _id = req.params.id;
    const userId = req.user._id;

    try {
       var post = await Post.findOne({ _id })
    } catch ({message}) {
        return next({
            status: 500,
            message
        });
    }

    if(!post) {
        return next({
            status: 404,
            message: 'Post not found'
        });
    }

    if ( userId.toString() !== post.userId.toString() ) {
        return next({
            status: '403',
            message: 'Permission denied'
        });
    }

    try {
        post.remove();
    } catch ({message}) {
       return next({
           status: 500,
           message
       });
    }

    return res
        .status(200)
        .json('Successfully deleted')

}