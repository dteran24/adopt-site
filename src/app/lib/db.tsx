import { MongoClient } from "mongodb";
const clientSecret = process.env.NEXT_PUBLIC_MONGODB_PASS;

export const connectToDatabase = async () => {
    try {
        const client = await MongoClient.connect(`mongodb+srv://dteran24:${clientSecret}@userdata.khv30hv.mongodb.net/?retryWrites=true&w=majority`);
        return client;
    } catch (e) {
        console.log(e)
    }
}