
import Post from '../models/post';
import User from '../models/user';


export async function getPost(req, res, next){
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

    res
        .status(200)
        .json(post)
}

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

//==================DELETE POST=====================
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



export function update(req, res, next){
    const postData = req.body;
    const _id = req.params.id;
    const userId = req.user._id;

    Post.findOne({_id}).exec(function(err, post){
        if (err) next({
            status: 500,
            message: err
        });

        if(!post){
            return next({
                status: 404,
                message: 'Post not found'
            })
        }

        if ( userId.toString() !== post.userId.toString() ) {
            return next({
                status: 403,
                message: 'Permission denied'
            });
        }

        Object.keys(postData).forEach(key => {
            if (!postData[key]) next({
                status: 500,
                message: `empty field: ${key}`
            })
        });

        post.title = postData.title;
        post.body = postData.body;
        post.url = postData.url;
        post.isPublic = postData.isPublic;

        post.save(function (err) {
            if (err) next({
                status: 500,
                message: err
            });

            res
                .status(200)
                .json(post);
        });

    });
}

