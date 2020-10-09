import mongoose from 'mongoose'

module MongoConnet {

let db;

export function cnctDB(collectionname : string){
  let dbLink = `mongodb://localhost/${collectionname}`
  mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true });

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
});

}

export function saveToDB(input : any){
     input.save(()=>{
       console.log(`Successfully saved ${input} to the database!`)
     })
}
}