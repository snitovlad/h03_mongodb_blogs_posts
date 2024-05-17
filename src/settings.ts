import { config } from 'dotenv' //забираем спецфункцию из библиотеки dotenv
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3004,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing'
    },
    DB_NAME: process.env.DB_NAME || '',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || '',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || '',
    MONGO_URL: process.env.MONGO_URL || '',
    ADMIN_AUTH: process.env.ADMIN_AUTH || ''
}

//export const ADMIN_AUTH = 'YWRtaW46cXdlcnR5'
//export const ADMIN_AUTH = process.env.ADMIN_AUTH || ''