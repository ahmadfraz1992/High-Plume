const mongoose = require("mongoose");
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
const customerRegisterSchema = new mongoose.Schema({
  c_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  type: { type: String, required: true },
  templatetype: { type: String, required: true },
  companyName: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  phoneNo: {
    type: String,
    default: ""
  },
  businessPhoneNo: {
    type: String,
    default: ""
  },
  businessAddress: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true }
  // startupQuestions: [loanSchema]
});
autoIncrement.initialize(db);
customerRegisterSchema.plugin(autoIncrement.plugin, "customerRegisterSchema");
var customerRegister = mongoose.model(
  "customerRegisterSchema",
  customerRegisterSchema
);
module.exports = mongoose.model("customerRegister", customerRegisterSchema);
