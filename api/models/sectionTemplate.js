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
const sectionTemplateSchema = new Schema({
  s_Id: {
    type: Number,
    autoIncrement: true,
    primarykey: true
  },
  q_Id: {
    type: Number
  },
  q_desc: {
    type: String,
    default: ""
  },
  tooltip: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
sectionTemplateSchema.plugin(autoIncrement.plugin, "sectionTemplateSchema");
var sectionTemplate = mongoose.model(
  "sectionTemplateSchema",
  sectionTemplateSchema
);
module.exports = mongoose.model("sectionTemplate", sectionTemplateSchema);
