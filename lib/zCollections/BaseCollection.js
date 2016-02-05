// No `var` makes it global in Meteor
/**
 * Collections provide an API for persisting and retrieving Entities.
 *
 * The Collection's responsibility is to transform the Entity into a plain
 * object before passing it to the database; and to load that plain object
 * into an Entity instance when retrieving from the database.
 *
 * This model, or it's sub-types, will change when there will be a new
 * way to load Entities, or new atomic methods for updating them.
 */
BaseCollection = (function(){
    "use strict";

    function BaseCollection() {
        this.entityConstructor = null;
        this.entityPrototype = null;
    }

    BaseCollection.prototype.setDatabaseConnection = function(db){
        this._db = db;
    };

    BaseCollection.prototype.save = function (o, callback) {
        if (!this.entityPrototype.isPrototypeOf(o)) {
            throw new Error("This object is not a Campaign");
        }

        if (o.__data__._id) {
            this._db.update(o.__data__._id, o.__data__, callback);
        } else {
            this._db.insert(o.__data__, callback);
        }
    };

    BaseCollection.prototype.findById = function (id) {
        var data = this._db.findById(id);
        if (!data)
            return null;
        return new this.entityConstructor(data);
    };

    BaseCollection.prototype.findAll = function(){
        var Entity = this.entityConstructor;
        return this._db.findAll().map(function(data){
            return new Entity(data)
        });
    };

    return BaseCollection;
})();

// For accessing with node
if(typeof module !== 'undefined') {
    module.exports = BaseCollection;
}