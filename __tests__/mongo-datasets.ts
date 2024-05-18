import { MongoClient } from "mongodb"
import { MongoMemoryServer } from 'mongodb-memory-server'
import { blogCollection, client, connectToDB } from "../src/db/mongo-db"
import { CreateBlogModel } from "../src/models/blogs-models/CreateBlogModel"
import { SETTINGS } from "../src/settings"
import { req } from "./test-helpers"


let testServer: MongoMemoryServer

export const connectToTestDb = async () => {
    try {
        testServer = await MongoMemoryServer.create() //запуск виртуального сервера с временной базой данных
        const uri = testServer.getUri() //получаем строку подключения
        await connectToDB(uri)
        console.log('Connected to local MongoDB for tests')
        return true
    } catch (e) {
        console.error('Failed to connect to local MongoDB', e)
        await client.close()
        return false
    }
}

export const clearTestDb = async () => {
    await blogCollection.deleteMany({})
    //await postCollection.deleteMany({})        
    console.log('Local MongoDB is empty')
}

export const closeTestDb = async () => {
    await client.close()
    await testServer.stop()
    console.log('Local MongoDB closed')
}

export const createNewBlog: CreateBlogModel = {
    name: 'name1',
    description: 'description1',
    websiteUrl: 'https://it.com'
}

