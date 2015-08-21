import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('post-new', {path: '/posts/new'});
  this.route('post', {path: '/posts/:id'});
  this.route('post-edit', {path: '/posts/:id/edit'});
});

export default Router;
