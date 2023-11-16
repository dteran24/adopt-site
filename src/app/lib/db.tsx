import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
    const client = await MongoClient.connect("mongodb+srv://dteran24:<DImP3fWmUza0uke6>@userdata.khv30hv.mongodb.net/?retryWrites=true&w=majority");

    return client;
}