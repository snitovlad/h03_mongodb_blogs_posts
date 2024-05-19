import { Request, Response } from 'express'
import { RequestWithParams } from '../../models/requestTypes'
import { URIParamsPostIdModel } from '../../models/posts-models/URIParamsPostIdModel'
import { PostViewModel } from '../../models/posts-models/PostViewModel'
import { postsMongoRepository } from './post-mongo-repository'

export const findPostController = async (req: RequestWithParams<URIParamsPostIdModel>,
    res: Response<PostViewModel>) => {

    const foundPost = await postsMongoRepository.findPost(req.params.id)
    if (!foundPost) {
        res.sendStatus(404)
        return
    }
    res.json(foundPost)
}
