import { Request, Response } from 'express'
import { BlogViewModel } from '../../models/blogs-models/BlogViewModel'
import { blogsMongoRepository } from './blogs-mongo-repository'


export const findAllBlogsController = async (req: Request, res: Response<BlogViewModel[]>) => {
    const allBlogs = await blogsMongoRepository.findAllBlogs()
    res
        .status(200)
        .json(allBlogs)
}