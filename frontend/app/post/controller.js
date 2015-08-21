import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        addComment: function() {
            var self = this;
            var input = prompt("Please enter comment", "");
            var comment = this.store.createRecord('comment', {
                body : input
            });
            comment.set('post', this.get('model'));
            comment.save().then(function(newComment) {
                self.get('model.comments').pushObject(newComment);
                self.get('model').save().then(function(post) {
                    console.log('success');
                })
            });
        },
        deleteComment: function(comment) {
            var self = this;
            self.get('model.comments').removeObject(comment);
            self.get('model').save().then(function(post) {
                comment.destroyRecord();
            });
        }
    }
});
