import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        create: function() {
            var self = this;
            this.get('model').set('comments', []);
            this.get('model').save().then(function(post) {
                console.log('successfully created a new post');
                console.log(post);
                self.transitionToRoute('post', post.get('id'));
            }, function(reason) {
                alert('cannot create a post!');
            });
        }
    }
});
