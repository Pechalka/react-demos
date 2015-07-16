
'use strict';
var _ = require('lodash');
var promise = require('q');
var Guid = require('./Guid');

function keyValue(key, value) {// TODO: _.object
    var obj = {};
    obj[key] = value;
    return obj;
}

//TODO : fix api
var LocalStorage = (function () {
    function Class(key, idPropName, isSetId) {
        this.key = 'time_tracker_' +
            '_' + key +
            '_' + (new Date()).getDate();
        this.idPropName = idPropName || 'id';
        this.isSetId = isSetId;
    }

    Class.prototype.get = function (id) {
        var deferred = promise.defer();
        setTimeout(function () {
            var data = JSON.parse(localStorage.getItem(this.key)) || [];
            deferred.resolve(
                id === undefined ?
                data :
                _.find(data, keyValue(this.idPropName, id))
            );
        }.bind(this), 0);
        return deferred.promise;
    };

    Class.prototype.post = function (item) {
        var deferred = promise.defer();
        setTimeout(function () {
            var data = JSON.parse(localStorage.getItem(this.key)) || [];
            item = _.cloneDeep(item);
            if (this.isSetId) {
                item[this.idPropName] = Guid();
            }
            data.push(item);
            localStorage.setItem(this.key, JSON.stringify(data));
            deferred.resolve(item);
        }.bind(this), 0);
        return deferred.promise;
    };

    Class.prototype.put = function (id, item) {
        var deferred = promise.defer();
        setTimeout(function () {
            if (_.isArray(item)) {
                localStorage.setItem(this.key, JSON.stringify(item));
                deferred.resolve(item);
                return;
            }
            var data = JSON.parse(localStorage.getItem(this.key)) || [];
            item = _.cloneDeep(item);
            var index = _.findIndex(data, keyValue(this.idPropName, id));
            if (index === -1) {
                data.push(item);
            } else {
                data[index] = item;
            }
            localStorage.setItem(this.key, JSON.stringify(data));
            deferred.resolve(item);
        }.bind(this), 0);
        return deferred.promise;
    };

    Class.prototype.del = function (id) {
        var deferred = promise.defer();
        setTimeout(function () {
            if (id == null) {
                localStorage.setItem(this.key, '[]');
                return;
            }
            var data = JSON.parse(localStorage.getItem(this.key)) || [];
            var index = _.findIndex(data, keyValue(this.idPropName, id));
            var item = data[index];
            data.splice(index, 1);
            localStorage.setItem(this.key, JSON.stringify(data));
            deferred.resolve(item);
        }.bind(this), 0);
        return deferred.promise;
    };

    return Class;
}());


module.exports = LocalStorage;