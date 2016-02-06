# Game Master

GameMaster is a web application for pen-and-paper RPGs, such as Dungeons and Dragons. 

The purpose of GameMaster is to provide tools for helping streamline P&P RPGs with
minimal preparation. 


## Architecture
There are two primary classes of objects in GameMaster:

* Models are classes of objects containing application logic.
* Collection are used to persist and retrieved Model instances.

An absolute must in developing GameMaster is to keep the application logic 
completely separated from the Meteor platform.

Meteor Packages, then, have the following responsibilities:
 
1. Implement the database connection interfaces for the Collections
1. Render Model information in the DOM
1. Tie DOM events to Model methods
1. Request that the Collection fetches/persists Models


### Models
Models represent a particular part of the application logic.

Some example Models for Campaigns, Encounter, PlayerCharacters, and Users.

There several conventions _must_ be upheld for all models.

First, All Models are created by loading in some plain data object into a constructor function.

Second, the data loaded into the models should always be validated on entry, and 
unexpected values should be discarded. 

Third, the validated but raw data should be kept away from the user by storing 
it a property called `__data__`. 

Here's an example showing the three conventions:

    function MyModel(data) {
        this.__data__ = validateMyModelData(data);
    }
    
    function validateMyModelData(data) {
        var validData = {};
        
        validData._id = data._id;
        validData.name = data.name;
     
        return validData
    }

    var myModelInstance = new MyModel({});

The fourth convention is that simple data should be made accessible via accessor 
methods assigned to the Models prototype. These functions act as both the 
getter and the setter for that property. For example:

    MyModel.prototype.status = function(status) {
        if (typeof status !== 'undefined') {
            this.__data__.status = status;
        }
        return this.__data__.status;
    }
    
Fifth, plural data should be made accessible through a method, but adding or
retrieving individual items should be done through distinct methods. It is preferred
to not have a setter for the entire collection.

    MyModel.prototype.favouriteNumbers = function() {
        return this.__data__.favouriteNumbers;
    }
    
    MyModel.prototype.addFavouriteNumber = function(number) {
        var fns = this.__data__.favouriteNumbers || [];
        
        if (fns.indexOf(number) >= 0)
            fns.push(number);
            
        this.__data__.favouriteNumbers = fns;
    }
    
    MyModel.prototype.removeFavouriteNumber = function(number) {
        var fns = this.__data__.favouriteNumbers || [];
        var numberIndex = fns.indexOf(number);
        
        if (numberIndex >= 0)
            fns.splice(number, 1);
            
        this.__data__.favouriteNumbers = fns;
    }
       
    
### Collections
    
Collections provide an interface for persisting and retrieving Models.

The term "Collection" may be a bit of a misnomer, as they usually would not 
persist the set of objects themselves. Instead, the Collections pass on this 
responsibility to a dependency injected database connection.

Thus, the true responsibility of the Collection classes is to pull the `__data__`
out of the model and pass it to the database when persisting, and to load the
data into a Model instance when retrieving.

Here's a trivial example:

    function MyModelCollection(_db) {
        this._db = _db;
    }

    MyModelCollection.prototype.findById = function (id) {
        var data = this._db.findById(id);
        if (!data)
            return null;
        return new MyModel(data);
    };
    
    MyModelCollection.prototype.save = function (myModel, callback) {
        if (!MyModel.prototype.isPrototypeOf(myModel)) 
            throw new Error("This is not MyModel");
        
        if (myModel.__data__._id)
            this._db.update(myModel.__data__._id, myModel.__data__, callback);
        else
            this._db.insert(myModel.__data__, callback);
        
    };
    
    var myModel = new MyModelCollection(databaseConnection).findById(1);
     
The previous code snipped just serves as an example of how things are done in
a general sense, but when creating a Collection for a new Model some time can 
be saved by a subclassing lib/zCollections/BaseCollection. As it stands, this
module provides several functions, including `setDatabaseConnection`, `findById`, 
`findAll`, and `save`. 

Subclassing Collection can be accomplished like so:

    MyModelCollection = (function(){
        function MyModelCollection() {
            BaseCollection.call(this);
            this.entityConstructor = MyModel;
            this.entityPrototype = MyModel.prototype;
        }
    
        MyModelCollection.prototype = Object.create(BaseCollection.prototype);
        MyModelCollection.prototype.constructor = MyModelCollection;
    
        return new MyModelCollection();
    })();
    
    MyModelCollection.setDatabaseCollection(databaseConnection);

