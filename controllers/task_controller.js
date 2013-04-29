//var $ = window.$;
//var ctwitter = window.ctwitter; 
//var console = window.console; 
var Task = require("../models/tasks.js"),
    TaskController = {};

TaskController.list = function (req, res) {
    Task.find({}, function (err, task) {
	if (err !== null) {
	    console.log(err);
	} else {
	    res.json(task);
	}
    });
};

TaskController.create = function (req, res) {
    var t = new Task({
	"description":req.body.description,
	"categories":req.body.categories
    });

    t.save(function (err, result) {
	if (err !== null) {
	    //send the error
	} else {
	    res.json(result);
	}
    });
};

TaskController.destroy = function (req, res) {
    Task.findOne({"description":req.body.description}, function (err, task) {
	if (err !== null) {
	    //handle err
	} else if (task === null) {
	    //task not found
	} else {
	    task.remove(function (err) {
		if (err !== null) {
		    //handle err
		}
	    });
	}
    });
};

module.exports = TaskController;
