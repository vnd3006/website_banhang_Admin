const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

module.exports.add = async (admin) => {
    return await dbs.production.collection('admin').insertOne(admin);
  };

module.exports.list = async () => {
    return results = await dbs.production.collection('admin').find()
      .toArray();
};

module.exports.update = async (id,admin) =>{
  return await dbs.production.collection('admin').updateOne({_id: ObjectId(id)}, {$set:admin})
}

const detail = async (id) =>{
  return results = await dbs.production.collection('admin').find({_id: ObjectId(id)})
  .toArray();
}
exports.detail = detail;