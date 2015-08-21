import Ember from 'ember';

export default Ember.Controller.extend({
    actions : {
        update: function() {
            var self = this;
            this.get('model').save().then(function(post) {
                self.transitionToRoute('post', post.get('id'));
            }, function(reason) {
                console.log(reason);
            });
        },
        delete: function() {
            var self     = this;
            var promises = [];
            var post = this.get('model');
            post.get('comments').forEach(function(item) {
                var p = item.destroyRecord();
                promises.pushObject(p);
            });
            Ember.RSVP.all(promises).then(function() {
                post.destroyRecord().then(function() {
                    self.transitionToRoute('index');
                });
            });
        }
    }
})
