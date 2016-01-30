/**
 * This module creates and registers the Mongo Collection for Campaigns.
 */
_db = _db || {};
_db.campaigns = new Mongo.Collection("campaigns");

