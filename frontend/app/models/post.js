import DS from 'ember-data';

let { Model, attr, hasMany } = DS;

export default Model.extend({
  title      : attr('string'),
  body       : attr('string'),
  created_at : attr(),
  updated_at : attr(),
  comments   : hasMany('comment', {async: true})
});
