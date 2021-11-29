const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
    const results = await dbs.production.collection('order').find({_id: ObjectId(id)})
      .toArray();
    return results[0];
};
exports.detail = detail;

module.exports.delivered = async () => {
    return results = await dbs.production.collection('order').find({status:"Đã nhận hàng"})
        .toArray();
};

module.exports.delivery = async () => {
    return results = await dbs.production.collection('order').find({status:"Đang giao"})
        .toArray();
};

module.exports.update = async (id) => {
    return await dbs.production.collection('order').updateOne({ _id: ObjectId(id)},{$set: {status:"Đã nhận hàng"}});
  };