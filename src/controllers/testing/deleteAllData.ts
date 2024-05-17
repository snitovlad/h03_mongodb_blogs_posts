import { Request, Response } from 'express'
import { db } from '../../db/db';

export const deleteAllData = (req: Request, res: Response) => {
    db.blogs = [];
    db.posts = []
    res.sendStatus(204)
}

