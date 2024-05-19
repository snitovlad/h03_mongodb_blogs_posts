import { createBlogController } from '../controllers/blogs/createBlogController';
import { findBlogController } from '../controllers/blogs/findBlogController';
import { updateBlogController } from '../controllers/blogs/updateBlogController';
import { findAllBlogsController } from '../controllers/blogs/findAllBlogsController';
import { Router } from 'express'
import { inputDescriptionBlogValidator, inputNameBlogValidator, inputWebsiteUrlBlogValidator } from '../middlewares/blog-validation-middleware';
import { inputCheckErrorsMiddleware } from '../middlewares/input-check-errors-middleware';
import { authMiddleware } from '../middlewares/auth-middleware';
import { deleteBlogController } from '../controllers/blogs/deleteBlogController';
import { inputIdValidator } from '../middlewares/input-id-validator';


export const blogsRouter = Router()

blogsRouter.get('/', findAllBlogsController)
blogsRouter.post('/',
    authMiddleware,
    inputNameBlogValidator(),
    inputDescriptionBlogValidator(),
    inputWebsiteUrlBlogValidator(),
    inputCheckErrorsMiddleware,
    createBlogController)

blogsRouter.get('/:id',
    inputIdValidator(),
    inputCheckErrorsMiddleware,
    findBlogController)

blogsRouter.delete('/:id',
    authMiddleware,
    inputIdValidator(),
    inputCheckErrorsMiddleware,
    deleteBlogController)

blogsRouter.put('/:id',
    authMiddleware,
    inputIdValidator(),
    inputNameBlogValidator(),
    inputDescriptionBlogValidator(),
    inputWebsiteUrlBlogValidator(),
    inputCheckErrorsMiddleware,
    updateBlogController)

// ...
