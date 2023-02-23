let projectData = {}
const express=require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors=require('cors');
app.use(cors());
const port =4800;

app.use(express.static('website'));
 
app.listen(port, () => {
    console.log(`${port}`)
  });
app.get('/all',(req,res)=>{
  res.send(projectData);
})
app.post('/index',(req,res)=>{
 projectData={
  temperature:req.body.temperature,
  date:req.body.date,
  response:req.body.response,
 }
 
 res.send(projectData);
})
