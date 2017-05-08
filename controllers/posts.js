
import Post from '../models/post';
import User from '../models/user';


const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 10;


function parseQueryString(query){
    let { q, skip, limit } = query;
    q = (q) ? q : '';
    skip = (skip) ? +skip : DEFAULT_SKIP;
    limit = (limit) ? +limit: DEFAULT_LIMIT;
    return { q, skip, limit}
}



//=================GET ALL POSTS===============
export async function getAll(req, res, next){
    const { q, skip, limit } = parseQueryString(req.query);
    const userId = req.user._id;

    let posts;
    try {
        if (q){
            posts = await Post
                .find( {
                    $and : [
                        {$text: {$search: q}},
                        { $or : [
                            { 'isPublic' : true },
                            { userId: userId }]
                        }
                    ]
                } )
                .skip(skip)
                .limit(limit);

        } else {
            posts = await Post
                .find( {
                    $or : [
                        { 'isPublic' : true },
                        { userId: userId }]
                } )
                .skip(skip)
                .limit(limit);
        }


    } catch ({message}) {
        return next({
            status: 400,
            message
        })
    }

    if (!posts) {
        return next({
            status: 400,
            message: 'Not found'
        })
    }
    res.json({ posts });
}

//==================GET POSTS BY LOGIN=====================
export async function getPostsByUserLogin(req, res, next){
    const { login } = req.params;
    const userId = req.user._id;
    const { skip, limit } = parseQueryString(req.query);
    let user, posts;

    try {
        user = await User.findOne({ login })
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
        if (userId.toString() === user._id) {
             posts = await Post
                 .find({userId: user._id})
                .skip(skip)
                .limit(limit);
        } else {

            posts = await Post
                .find({
                    $and: [
                        {userId: user._id},
                        {'isPublic': true}
                    ]
                })
                .skip(skip)
                .limit(limit);
        }

    } catch ({message}) {
        return next({
            status: 500,
            message
        })
    }

    res.json({ posts });

}

