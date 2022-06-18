const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));   // all files will be stored in public folder

app.get("/", function(req, res){

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options); // to use this function we need to create an object defining 

    res.render("list", {listTitle: day, newListItems: items}); // first render list.ejs file

});

app.post("/", function(req, res){  // after the user enters the value in the input field we can access in post request
    
    let item = req.body.newItem;    // in req.body we can can access newitem input field and the button since they have names
    
    console.log(req.body)
    
    if(req.body.button === "Work"){   // imp, since we gave the name of listTitle as Work(space)List the name of button will be saved as Work
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

// app.post("/work", function(req, res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/")
// })

app.listen(3000, function(){
    console.log("Server is running at port 3000")
})