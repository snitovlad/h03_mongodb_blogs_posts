import { blogCollection, postCollection } from "../../db/mongo-db";

export const deleteAllDataRepository = {
    async deleteAllData(): Promise<{ success?: boolean }> {

        try {
            await blogCollection.deleteMany({})
            await postCollection.deleteMany({})
            return { success: true }
        } catch (e) {
            throw new Error('Failed to delete all data')
        }
    }
    // async deleteAllData() {
    // const deleteInfoBlog = await blogCollection.deleteMany({})
    // const deleteInfoPost = await postCollection.deleteMany({})

    //     return deleteInfo.deletedCount === 1 //eсли 1 - значит true
    // }
}
