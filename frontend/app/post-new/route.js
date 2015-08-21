import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.createRecord('post');
    },
    deactivate: function() {
        var self = this;
        var model = this.controllerFor('post-new').get('model');
        if (model.get('hasDirtyAttributes')) {
            model.rollbackAttributes();
        }
    }
});
