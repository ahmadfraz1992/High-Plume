const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
mongoose
  .connect(
    "mongodb://node-rest-shop:" +
      process.env.MONGO_ALTAS_PW +
      "@node-shop-shard-00-00-bfcde.mongodb.net:27017,node-shop-shard-00-01-bfcde.mongodb.net:27017,node-shop-shard-00-02-bfcde.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-shard-0&authSource=admin&retryWrites=true",
    {
      // useCreateIndex: true,
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const db = mongoose.connection;
const filteredSectionQuestionSchema = new Schema({
  filtered_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  sc_id: {
    type: Number
  },
  cat_name: {
    type: String
  },
  section_name: {
    type: String
  },
  q_id: {
    type: Number
  },
  q_desc: {
    type: String
  }
});
autoIncrement.initialize(db);
filteredSectionQuestionSchema.plugin(
  autoIncrement.plugin,
  "filteredSectionQuestionSchema"
);
var filteredSectionQuestion = mongoose.model(
  "filteredSectionQuestionSchema",
  filteredSectionQuestionSchema
);
module.exports = mongoose.model(
  "filteredSectionQuestionSelected",
  filteredSectionQuestionSchema
);
