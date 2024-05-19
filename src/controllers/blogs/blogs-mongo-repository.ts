import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import { currentDateISOString } from "../../helper/helper";
import { BlogViewModel } from "../../models/blogs-models/BlogViewModel";
import { CreateBlogModel } from "../../models/blogs-models/CreateBlogModel";
import { UpdateBlogModel } from "../../models/blogs-models/UpdateBlogModel";
import { BlogDBType } from "../../db/db-type";

export const blogsMongoRepository = {

    async findAllBlogs(): Promise<BlogViewModel[]> {
        const blogs = await blogCollection.find({}).toArray() //можно без await 
        return blogs.map(this.mapToOutput)
    },

    async findBlog(id: string): Promise<BlogViewModel | null> {
        const blog = await blogCollection.findOne({ _id: new ObjectId(id) })
        if (!blog) return null
        return this.mapToOutput(blog)
    },

    async createdBlog(input: CreateBlogModel): Promise<{ error?: string, id?: ObjectId }> {
        const newBlog = {
            _id: new ObjectId(),
            ...input,
            createdAt: currentDateISOString(),
            isMembership: false

        }
        try {
            const insertedInfo = await blogCollection.insertOne(newBlog)
            console.log(insertedInfo)
            return { id: insertedInfo.insertedId } //возвращаем объект
        } catch (e: any) {
            // log
            return { error: e.message }
        }
    },

    async deleteBlog(id: string): Promise<boolean> {

        //const foundBlog = await this.findBlog(id)
        // if (foundBlog) {
        //     await blogCollection.deleteOne(foundBlog)
        //     return true
        // } else return false

        const deleteInfo = await blogCollection.deleteOne({ _id: new ObjectId(id) })
        return deleteInfo.deletedCount === 1 //eсли 1 - значит true
    },

    async updateBlog(id: string, input: UpdateBlogModel): Promise<boolean | { error?: string }> {
        // if (foundBlog) {
        //     const updateBlog = {...foundBlog, ...input}
        //     try {
        //         const insertedInfo = await blogCollection.updateOne( {_id: id}, {$set: updateBlog} )
        //     } catch (e: any) {
        //         // log
        //         return { error: e.message }
        //     }
        //     return true
        // } else {
        //     return false
        // }
        let foundBlog = await this.findBlog(id)
        const updateBlog = { ...foundBlog, ...input }
        try {
            const updateInfo = await blogCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateBlog })
            return updateInfo.matchedCount === 1
        } catch (e: any) {
            // log
            return { error: e.message }
        }
    },

    mapToOutput(blog: BlogDBType): BlogViewModel {
        return {
            id: blog._id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }
}