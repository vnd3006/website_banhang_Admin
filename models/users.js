const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('user').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};

const detailUser = async (id) => {
  const results = await dbs.production.collection('user').find({id: id})
    .toArray();
  return results[0];
};
exports.detail = detail;
exports.detailUser = detailUser



module.exports.list = async () => {
    return await dbs.production.collection('user').find({})
      .toArray();
};
module.exports.list_active = async () => {
  return await dbs.production.collection('user').find({block: false})
    .toArray();
};

// module.exports.add = async (user) => {
//   return await dbs.production.collection('user').insertOne(user);
// };

// module.exports.delete = async (id) => {
//   return await dbs.production.collection('user').deleteOne({ _id: ObjectId(id)});
// };

module.exports.listLock = async () => {
  return await dbs.production.collection('user').find({block: true})
    .toArray();
};

module.exports.addLock = async (id,user) => {
  return await dbs.production.collection('user').updateOne({_id:ObjectId(id)},{$set: user});

  // return await dbs.production.collection('lockUsers').insertOne(user);
};

module.exports.deleteLock = async (id,user) => {
  return await dbs.production.collection('user').updateOne({_id:ObjectId(id)},{$set: user});
  // return await dbs.production.collection('lockUsers').deleteOne({ _id: ObjectId(id)});
};