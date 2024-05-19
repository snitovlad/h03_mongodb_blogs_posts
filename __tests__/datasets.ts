import { ObjectId } from 'mongodb'
import { DBType } from '../src/db/db'
import { BlogDBType, PostDBType } from '../src/db/db-type'
import { currentDateISOString } from '../src/helper/helper'
import { blogCollection } from '../src/db/mongo-db'

//наборы данных для тестов:

export const blog1: BlogDBType = {
    _id: new ObjectId(),
    name: 'name' + Date.now() + Math.random(),
    description: 'description' + Date.now() + Math.random(),
    websiteUrl: "https://DYRWHwiC8mf9V8quyGQZG-3DEaI6VWaZkmtQa.com",
    createdAt: currentDateISOString(),
    isMembership: false
}
export const post1: PostDBType = {
    _id: new ObjectId(),
    title: 'titleTest',
    shortDescription: 'shortDescription' + Date.now() + Math.random(),
    content: 'content' + Date.now() + Math.random(),
    blogId: blog1._id.toString(),
    blogName: blog1.name,
    createdAt: currentDateISOString()

}


// ...

// export const dataset1: DBType = {
//     blogs: [blog1],
//posts: [post1]
//}

// export const dataset2: DBType = {
//     blogs: [blog1],
//     posts: [post1]
// }
//export const dataset1: BlogDBType = blogCollection.insertOne(blog1)

// ...