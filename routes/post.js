import express from 'express';

import * as PostController from '../controllers/post';

const router = express.Router();

router.post('/posts', PostController.create);
router.get('/posts', PostController.getAll);
router.get('/post/:login', PostController.getPostsByUserLogin);
router.get('/post/:is', PostController.deletePost);

export default router;