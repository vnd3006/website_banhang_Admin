const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('product').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const detailProduct = async (id) => {
  const results = await dbs.production.collection('product').find({id: id})
    .toArray();
  return results[0];
};

module.exports.list = async () => {
  return await dbs.production.collection('product').find({})
    .toArray();
};

module.exports.add = async (product) => {
  return await dbs.production.collection('product').insertOne(product);
};

module.exports.delete = async (id) => {
  return await dbs.production.collection('product').deleteOne({ _id: ObjectId(id)});
};

module.exports.update = async (id,product) => {
  return await dbs.production.collection('product').updateOne({ _id: ObjectId(id)},{$set: product});
};

exports.detail = detail;
exports.detailProduct = detailProduct