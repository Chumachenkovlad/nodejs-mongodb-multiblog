import express from 'express';

import * as PostController from '../controllers/post';

const router = express.Router();

router.get('/posts?', PostController.getAll);
router.post('/posts', PostController.create);
router.put('/posts', PostController.update);
router.delete('/post/:id', PostController.deletePost);

router.get('/post/:login?', PostController.getPostsByUserLogin);



export default router;