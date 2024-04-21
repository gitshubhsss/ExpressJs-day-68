const express = require("express");
const app = express();
const port = 8081;
//to generate the random ids
const { v4: uuidv4 } = require('uuid');
//override the post method to path
let methodOverride = require('method-override')
app.use(methodOverride('_method'))
const path = require("path");
app.set("view engine", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});

//database

const posts = [
  {
    id:uuidv4(),//this funtion is used to generate the radomm ids
    username: "apana collage",
    content: "This is the best platform to learn the coding !",
  },
  {
    id:uuidv4(),
    username: "shubhamranjane",
    content:
      "the sky is in your palm and when you open your palm the sky is not limit !",
  },
  {
    id:uuidv4(),
    username: "ashish ranjane",
    content: "consistency is the key of success !",
  },
];



app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//search the post on the basis of id
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;

  let post= posts.find(findId);
  function findId(p){
    return id===p.id
  }
  res.render("show.ejs",{post})
})


app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
//to add the new post on the page
app.post("/posts", (req, res) => {
  let {username, content} = req.body;
  let id=uuidv4();
  posts.push({username,content,id});//we are pushing the new post in the database
  res.redirect("/posts")
});

//sending request for creating the new form 

app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params;
  let post= posts.find(findId);
  function findId(po){
    return id===po.id;
  }
  res.render("edit.ejs",{post})
})

//upadating the post content
app.patch("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post= posts.find(findId);
  function findId(po){
    return id===po.id;
  }
  console.log(`this is original text ${post.content}`)
  let newContent=req.body.content;
  post.content=newContent;
  res.redirect("/posts")
}) 