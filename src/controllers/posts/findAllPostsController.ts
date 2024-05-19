import { Request, Response } from 'express'
import { PostViewModel } from '../../models/posts-models/PostViewModel'
import { postsMongoRepository } from './post-mongo-repository'

//контроллер для эндпоинта:

export const findAllPostsController = async (req: Request, res: Response<PostViewModel[]>) => {
    const allPosts = await postsMongoRepository.findAllPosts()
    res
        .status(200)
        .json(allPosts)
}