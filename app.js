//var $ = window.$;
//var ctwitter = window.ctwitter; 
//var console = window.console; 
    "use strict";
var http = require("http"),
    express = require("express"),
    path = require("path"),
    app = express(),
    tc;

// Load Controllers
tc = require("./controllers/task_controller.js");

app.configure(function () {
    // Define our static file directory, it will be 'public'                             
    app.use(express.static(path.join(__dirname, "public")));

    // This allows us to parse the post requests data
    app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function () {
    console.log("Server running on port 3000");
});

app.get("/task.json", tc.list);
app.post("/task/new", tc.create);
app.post("/task/delete", tc.destroy);

