import { MongoClient, Db } from 'mongodb';
const url = "mongodb://localhost:27017";
const database = 'cards-against';

export class Database {
        static execute = async (action: (db: Db) => any): Promise<any> => {
                let client = await MongoClient.connect(url, { useNewUrlParser: true });
                let db = client.db(database);

                const result = action(db);
                
                client.close();
                return result;
        }
}
