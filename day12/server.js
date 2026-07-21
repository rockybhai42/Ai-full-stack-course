import express from "express"

const app = express();
app.use(express.json());


let tasks =[
    {id:1 ,title:"buy milk", done:false},
    {id:2 ,title:"buy eggs", done:false},
    {id:3 ,title:"buy bread", done:false},
    {id:4 ,title:"buy butter", done:false},
    {id:5 ,title:"buy cheese", done:false},
];


app.get("/tasks",(req, res)=>{
    res.json(tasks);
});
app.post('/tasks',(req, res)=>{
    const newtask = {id:tasks.length+1,...req.body}
    tasks.push(newtask);
    res.status(201).json(newtask);
});

app.put('/tasks/:id',(req, res)=>{
   
    const task = tasks.find(task => task.id === Number(req.params.id));
    if(!task){
        return res.status(404).json({error:"task not found"});
    }
    task.title = req.body.title;
    task.done = req.body.done;
    res.json(task);



    
})

app.delete('/tasks/:id',(req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    if(!task){
        return res.status(404).json({error:"task not found"});
    }
    const index = tasks.indexOf(task);
    tasks.splice(index,1);
    res.status(200).json({message:"task deleted"});
})


const port = 3000;
app.listen(port,()=>{
    console.log(`server is runnig ${port} `)
})