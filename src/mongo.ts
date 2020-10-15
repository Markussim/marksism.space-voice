import mongoose, { MongooseDocument, QueryCursor } from 'mongoose'

export module MongoConnect {

  let db: any;

  let collectionnameGlobal: string;

  export function cnctDB(collectionname: string) {
    collectionnameGlobal = collectionname;
    let dbLink = `mongodb://localhost/${collectionnameGlobal}`
    mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true });

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
    });

  }

  export function saveToDB(input: any) {
    input.save(() => {
      console.log(`Successfully saved ${input} to the database!`)
    })
  }

  export async function getCursor(model: any) {
    return await model.find({});
  }

  export function getDB() {
    return db;
  }
}