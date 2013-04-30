//var $ = window.$;
//var ctwitter = window.ctwitter; 
//var console = window.console; 
var mongoose = require("mongoose"),
    TasksSchema,
    Tasks;

mongoose.connect("mongodb://localhost/development");

TasksSchema = new mongoose.Schema({
    "description": String,
    "categories" : Array
});

Tasks = mongoose.model("Tasks", TasksSchema);

Tasks.findOne({}, function (err, result) {
    'use strict';
    if (err !== null) {
        console.log(err);
    } else if (result === null) {
        var t = new Tasks({
                "description": "Description Name",
                "categories": ["Category 1", "Category2"]

            });

        t.save(function (err) {
            if (err !== null) {
                console.log(err);
            }
        });
    }
});

module.exports = Tasks;

