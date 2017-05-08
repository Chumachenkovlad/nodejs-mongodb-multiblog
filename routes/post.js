import express from 'express';

import * as PostController from '../controllers/post';
import * as PostsController from '../controllers/posts';

const router = express.Router();

router.get('/posts', PostsController.getAll);
router.get('/posts/:login', PostsController.getPostsByUserLogin);

router.post('/post', PostController.create);
router.get('/post/:id', PostController.getPost);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.deletePost);


export default router;