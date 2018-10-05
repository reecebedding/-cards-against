import { MongoClient, Db } from 'mongodb';
const url = "mongodb://localhost:27017";
const database = 'cards-against';

let db: Db = null;

export class Database {
        static db = async (): Promise<Db> => {
                let client = await MongoClient.connect(url, { useNewUrlParser: true });
                let db = client.db(database);
                return db;
        }
}
