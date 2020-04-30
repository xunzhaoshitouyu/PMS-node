/*
 * @Author: cc 
 * @Date: 2020-04-29 11:46:12 
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-29 11:53:24
 * @desc 位置模型 
 */

const Sequelize = require('sequelize');

const BasicModel = require('../../BasicModel');

class Location extends BasicModel {};
Location.init({
    id: {
        type: Sequelize.STRING(64),
        field: 'id',
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    locationName: {
        type: Sequelize.STRING(200),
        field: 'location_name',
    },
    locationDescription: {
        type: Sequelize.STRING(200),
        field: 'location_description',
    },
    latitude: {
        type: Sequelize.DOUBLE(16, 0),
        field: 'latitude',
    },
    longitude: {
        type: Sequelize.DOUBLE(16, 0),
        field: 'longitude',
    },
    isDeleted: {
        type: Sequelize.INTEGER(1),
        field: 'is_deleted',
        defaultValue: 0,
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        defaultValue: new Date(),
    }
}, {
    tableName: 'location'
});

module.exports = Location;