var express=require("express"),
    app=express()   

   
    app.get("/",function(req,res){
        res.render("firstbot"); 
     });
     
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.listen(80,function(){
    console.log("The bot server has started!!!");
});