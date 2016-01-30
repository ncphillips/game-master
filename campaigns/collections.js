/**
 * This module creates and registers the Mongo Collection for Campaigns.
 */
if (typeof _db === 'undefined'){
    _db = {};
}
_db.campaigns = new Mongo.Collection("campaigns");

