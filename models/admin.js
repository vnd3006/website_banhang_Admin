const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

module.exports.add = async (admin) => {
    return await dbs.production.collection('admin').insertOne(admin);
  };

  module.exports.list = async () => {
    return results = await dbs.production.collection('admin').find()
      .toArray();
};