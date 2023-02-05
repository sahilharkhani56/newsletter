const express= require("express");
const bodeParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodeParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const Firstname=req.body.firstname;
    const Lastname=req.body.lastname;
    const Email=req.body.email;
    const data={
        member:[{
            email_address:Email,
            status:"subscribed",
            merge_fields :{
                FNAME:Firstname,
                LNAME:Lastname
            }
        }
        ]
    }
    const Jsondata=JSON.stringify(data);
    const options={
        method: 'POST',
        headers: {
        Authorization: 'auth 2e3f952bf0064d6a6be82894a859d03a-us14'
        },
    }
    const request1=https.request("https://us14.api.mailchimp.com/3.0/lists/4abb421041",options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request1.write(Jsondata);
    request1.end();

})
app.listen(process.env.PORT|| 3000,function(){
    console.log("Server is running on port 3000");
})
// fceb9909698a29f77f290f69640ec386-us14
// fceb9909698a29f77f290f69640ec386-us14
// 4abb421041.