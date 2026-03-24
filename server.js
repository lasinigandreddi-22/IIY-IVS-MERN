var express=require("express");
var app=express();
app.get("/",function(req, res){
	res.send("welcome to express");
})
app.post("/admin", function(req, res){
	res.send("welcome to admin page");
})
app.put("/admin/:id", function(req, res){
	const id=req.params.id;
	res.send("data updated"+id);
})
app.delete("/delete", function(req, res){
	res.send("data deleted");
})
app.listen(3002);
console.log("server is running");