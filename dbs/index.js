const MongoClient = require('mongodb').MongoClient

var url = "mongodb+srv://admin:admin@salesweb.weofn.mongodb.net/SalesWeb"


var dbs = {production: {}};

function connect(url) {
  console.log("object");
  return MongoClient.connect(url, {useNewUrlParser: true}).then(client => client.db('mihishop'))
}

exports.initdb = async function () {
  let database = await connect(url);
  dbs.production = database;
}


exports.dbs = dbs;