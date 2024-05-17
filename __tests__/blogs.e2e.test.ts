import { req } from './test-helpers'
import { ADMIN_AUTH, SETTINGS } from '../src/settings'
import { db, setDB } from '../src/db/db'
import { dataset1 } from './datasets'
import { CreateBlogModel } from '../src/models/blogs-models/CreateBlogModel'
import { UpdateBlogModel } from '../src/models/blogs-models/UpdateBlogModel'

//простой тест:

describe('/blogs', () => {
    beforeAll(async () => {
        // await req.delete('/testing/all-data')
    })
    //авторизация
    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    it('should return 200 and empty array', async () => {
        setDB()
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        //console.log(res.body)
        expect(res.body.length).toBe(0)
    })

    it('should get not empty array', async () => {
        setDB(dataset1)
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        //console.log(res.body)
        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.blogs[0])
    })

    it('should return 404 for not exiting blog', async () => {
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/-100') //нет такого id
            .expect(404) // проверка на ошибку
    })

    //создание нового блога
    it('should create blog', async () => {
        setDB()

        const newBlog: CreateBlogModel = {
            name: 'name1',
            description: 'description1',
            websiteUrl: 'https://it.com'
        }
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'authorization': 'Basic ' + codedAuth }) //авторизация
            .send(newBlog) // отправка данных           
            .expect(201)

        expect(res.body.name).toBe(newBlog.name)
        expect(res.body.description).toBe(newBlog.description)
        expect(res.body.websiteUrl).toEqual(newBlog.websiteUrl)
    })

    it('shouldn\'t create blog with incorrect input data', async () => {
        setDB()

        const newBlog: CreateBlogModel = {
            name: 'name1',
            description: 'description1',
            websiteUrl: 'https://it-com' //incorrect input data
        }
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(newBlog) // отправка данных
            .expect(400)

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [])
        //expect(res.body.availableResolutions).toEqual(undefined)
    })

    it('shouldn\'t create blog with incorrect input name', async () => {
        setDB()
        const newBlog: CreateBlogModel = {
            name: '   ', //incorrect input data
            description: 'description1',
            websiteUrl: 'https://it.com'
        }
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(newBlog) // отправка данных
            .expect(400)

        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [])
    })

    //не должен обновить с некорректными входными данными 
    it(`shouldn't update blog with incorrect input data`, async () => {
        setDB(dataset1)
        const updateBlog: UpdateBlogModel = {
            name: 'name1',
            description: 'description1',
            websiteUrl: 'https://it-com' //incorrect input data
        }

        await req
            .put(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updateBlog)
            .expect(400)
        //проверим, что действительно не создался блог
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .expect(200, db.blogs[0])
        expect(res2.body).toEqual(db.blogs[0])
    })

    //не должен обновить с некорректным входным name 
    it(`shouldn't update blog with incorrect input data`, async () => {
        setDB(dataset1)
        const updateBlog: UpdateBlogModel = {
            name: '   ', //incorrect input data
            description: 'description1',
            websiteUrl: 'https://it.com'
        }

        await req
            .put(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updateBlog)
            .expect(400)
        //проверим, что действительно не создался курс
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .expect(200, db.blogs[0])
        expect(res2.body).toEqual(db.blogs[0])
    })

    //не должен обновиться блог, которого нет
    it(`shouldn't update blog that not exist`, async () => {
        setDB(dataset1)
        const updateBlog: UpdateBlogModel = {
            name: 'name1',
            description: 'description1',
            websiteUrl: 'https://it.com'
        }

        await req
            .put(SETTINGS.PATH.BLOGS + '/-100')
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updateBlog)
            .expect(404)
    })

    //должно обновиться видео с корректными входными данными
    it(`should update video with correct input data`, async () => {
        setDB(dataset1)
        const updateBlog: UpdateBlogModel = {
            name: 'name1',
            description: 'description1',
            websiteUrl: 'https://it.com'
        }

        const res1 = await req
            .put(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updateBlog)
            .expect(204)
        //проверим, что действительно обновился блог
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .expect(200, {
                ...db.blogs[0],
                name: updateBlog.name,
                description: updateBlog.description,
                websiteUrl: updateBlog.websiteUrl
            })
    })

    //удаление блога и возвращение пустого массива
    it(`should delete blog and return empty array`, async () => {
        setDB(dataset1)
        //проверили, что видео есть в базе данных
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, dataset1.blogs)
        //удалим его
        await req
            .delete(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .expect(204)
        //проверим, что действительно удалился
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, [])
    })

    //не должен удалить несуществующий блог
    it(`shouldn't delete blog that not exist`, async () => {
        setDB(dataset1)

        //проверили, что блог есть в базе данных
        await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, dataset1.blogs)

        await req
            .delete(SETTINGS.PATH.BLOGS + '/-100')
            .set({ 'authorization': 'Basic ' + codedAuth })
            .expect(404)
        //проверим, что ничего не удалилось
        await req
            .get(SETTINGS.PATH.BLOGS + '/' + db.blogs[0].id)
            .expect(200, db.blogs[0])
    })
})

