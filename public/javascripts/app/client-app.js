var $ = window.$;
var ctwitter = window.ctwitter; 
var console = window.console; 
var main = function () {
    "use strict";
    //variable count
    var totalTasks = 0,
        categTasks = 0,
        itemNum    = 0,
        numTasks   = 0,
        allTasks   = 0,
        totalTasks = 0;
        

    //Show & Hide
    /*$(".tabs").hide();
    $(".edit_tab_content").hide();
    $(".resetButton").hide();
    $("#startButton").click(function () {
        $(".startButton").hide();
        $(".resetButton").show();
        $(".tabs").delay(80000000).fadeIn(80000000).show();
        $(".edit_tab_content").delay(80000000).fadeIn(80000000).show();
    }); // end of .click function  */
  //Function that generates a unique ID. 
    var PseudoGuid = new (function() {
            this.empty = "00000000-0000-0000-0000-000000000000";
            this.GetNew = function() {
                var fourChars = function() {
                        return (((1 + Math.random()) * 0x10000) | 1).toString(16).substring(1).toUpperCase();
                    }
                return (fourChars() + fourChars() + "-" + fourChars() + "-" + fourChars() + "-" + fourChars() + "-" + fourChars() + fourChars() + fourChars());
    };
  })();

  //Variable calls for the unique ID.
  itemNum = PseudoGuid.GetNew();
  numTasks = 0;
  allTasks = 0; 
    
    var buildCategorized = function () {
        //Remove old content
        $("#Categorized").children().remove();
        //creates fresh content from database
        $.getJSON("/task.json", function (task) {
          var categArray = [];
          task.forEach(function (task) {
            task.categories.forEach(function(category){
              if (categArray.indexOf(category) === - 1) {
                console.log(category); 
                $("#Categorized").append("<div class='item "
                    + numTasks
                    + "'><h4 class='categoryTitle'>"
                    + category
                    + "</h4><p class='description'>"
                    + " &#187; " + task.description
                    + "</p><p class='remove'>"
                    + "<button type='button' class='remove' id='" + numTasks + "'>Remove</button>"
                    + "</p></div>");
                  categArray.push(category);
              } else {
                $("." + category).append("<div class='description'>"
                    + " &#187; " + task.description
                    + "</div>");
                }
              $("#" + numTasks).click(function () {
                console.log("Removed task from Category tab.");
                var categTaskRemoved = $(this).attr("id");
                $("." + categTaskRemoved).remove(); 
                  totalTasks--;
                  totalTasks++; 
                });
              numTasks+= 1;
            });
          });
        });
    },

    buildUpTabHandler = function (anchor) {
        anchor.click(function () {
            var target = $(this).attr("href");

            $(".active").removeClass("active");
            $(this).addClass("active");
            $("#" + target).addClass("active");

            if (target === "Categorized") {
                buildCategorized();
            } else if (target === "ALL") {
              $("#All").children().remove(); 
              jsonInitializer();
            }

            return false;
        });
    };

    //Reorganized Code -- Moved this function near the BuildAddTaskHandler Function. 
    var addTask = function (desc, categories) {
        $("#All").append("<div id='" + itemNum + "'' class='item " + allTasks + "'' >"
            + "<p class='description'>" + desc + "</p>"
            + "<p class='categories'>" + categories + "</p>"
            + "<button type='button' class='remove' id='" + itemNum + "'>Remove</button>"
            + "</div>");
      
        $("#" + itemNum).click(function () {
          console.log("removed task from All Tab");
          var taskRemoved = $(this).attr("id");
          var deletedTask = $("." + taskRemoved + " > ").html();
          var trash = {
            description: deletedTask
          };
          $("#" + taskRemoved).fadeOut(150, function() {
            $.post("task/delete", trash, function (response) {
              console.log(response);
            });
            $(this).remove();
          });
          totalTasks--;
    });
    itemNum+= 1;
    allTasks+= 1; 
    totalTasks++;
  };
    var buildUpaddTaskHandler = function () {
        $("#addTask").click(function () {
            console.log("Added Task to All & Category Tab");
            var desc = $("#desc").val(),
                categories = $("#categ").val(),
                post_object = {};

        if (desc === "" || categories === "") {
          alert("hey! you gotta put in a description and category");
        } else {
            post_object.description = desc;
            post_object.categories = categories.split(/[\s,]+/);
            console.log(post_object);

            $.post("/task/new", post_object, function (response) {
              console.log(response);
            });
            
            //send task to DOM
            addTask(desc, categories);

            $("#desc").val("");
            $("#categ").val("");
        }

        });
        
    };
    
    var jsonInitializer = function () {
      $(".welcome").show();
      $.getJSON("/task.json", function (tasks) {
          tasks.forEach(function (task) {
          var categoriesString = "";
              task.categories.forEach(function (category) {
                  categoriesString = categoriesString + " " + category;
              });
              addTask(task.description, categoriesString);
          });
      });
    };

    var initialize = function () {
        jsonInitializer();
        buildUpTabHandler($(".tabs .tab"));
        buildUpaddTaskHandler();
    };

    initialize();

};

$(document).ready(main);