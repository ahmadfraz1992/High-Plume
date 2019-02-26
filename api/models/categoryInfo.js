const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
mongoose
  .connect(
    "mongodb://node-rest-shop:" +
      process.env.MONGO_ALTAS_PW +
      "@node-shop-shard-00-00-bfcde.mongodb.net:27017,node-shop-shard-00-01-bfcde.mongodb.net:27017,node-shop-shard-00-02-bfcde.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-shard-0&authSource=admin&retryWrites=true",
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const db = mongoose.connection;

const categoryInfoSchema = mongoose.Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  cat_id: {
    type: Number
  },
  section_id: {
    type: Number,
    default: ""
  },
  section_name: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
categoryInfoSchema.plugin(autoIncrement.plugin, "categoryInfo");
var catInfo = mongoose.model("categoryInfo", categoryInfoSchema);
module.exports = mongoose.model("categoryInfo", categoryInfoSchema);
