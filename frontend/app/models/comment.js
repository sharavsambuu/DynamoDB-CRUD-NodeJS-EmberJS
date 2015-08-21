import DS from 'ember-data';

let { Model, attr, belongsTo } = DS

export default Model.extend({
  body       : attr('string'),
  created_at : attr(),
  post       : belongsTo('post')
});
