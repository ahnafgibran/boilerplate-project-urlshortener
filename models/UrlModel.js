var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  _id: {type: Number, required: true},
	urlPath: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model("Url", UrlSchema);