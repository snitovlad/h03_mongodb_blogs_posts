import { ObjectId } from 'mongodb';
import { Request, Response } from 'express'
import { RequestWithParams } from '../../models/requestTypes'
import { URIParamsBlogIdModel } from '../../models/blogs-models/URIParamsBlogIdModel'
import { BlogViewModel } from '../../models/blogs-models/BlogViewModel'
import { blogsMongoRepository } from './blogs-mongo-repository'


export const findBlogController = async (req: RequestWithParams<URIParamsBlogIdModel>,
    res: Response<BlogViewModel>) => {
    const foundBlog = await blogsMongoRepository.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    res.json(foundBlog)
}
