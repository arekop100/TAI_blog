'use strict';

import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../services/mongoConverter';
import * as _ from "lodash";

const postSchema = new mongoose.Schema({
  title: {type: String},
  url: {type: String},
  content: {type: String},
}, {
  collection: 'post'
});
postSchema.plugin(uniqueValidator);

const PostModel = mongoose.model('post', postSchema);

async function query() {
  const result = await PostModel.find({});
  {
    if (result) {
      return mongoConverter(result);
    }
  }
}

async function get(id) {
  return PostModel.findOne({_id: id}).then(function (result) {
    if (result) {
      return mongoConverter(result);
    }
  });
}

async function search(content) {
  if(content.content === ''){
    return;
  }

  let regex = new RegExp('.*' + content.content + '.*', 'i');
  return PostModel.find({content: regex}).then(function (result) {
    if (result) {
      return mongoConverter(result);
    }
  });
}

async function createNewOrUpdate(data) {
  return Promise.resolve().then(() => {
    if (!data.id) {
      return new PostModel(data).save().then(result => {
        if (result[0]) {
          return mongoConverter(result[0]);
        }
      });
    } else {
      return PostModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
    }
  });
}

export default {
  query: query,
  get: get,
  createNewOrUpdate: createNewOrUpdate,
  search: search,
  model: PostModel
};
