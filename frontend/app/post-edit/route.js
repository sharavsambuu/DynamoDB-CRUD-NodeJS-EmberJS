import Ember from 'ember';

export default Ember.Route.extend({
    model: function(param) {
        return this.store.find('post', param.id);
    },
    deactivate: function() {
        var self = this;
        var model = this.controllerFor('post-edit').get('model');
        if (model.get('hasDirtyAttributes')) {
            model.rollbackAttributes();
        }
    }
});
