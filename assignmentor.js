const express=require('express');
const app=express();
const cors=require("cors");


app.use(express.json());
app.use(cors());
//Local data initial
var initial_data_student=[{id:"1d",name:"Alex",year:"2nd",mentor_name:"",mentor_id:""},{id:"2d",name:"John",year:"4th",mentor_name:"",mentor_id:""},{id:"3d",name:"Nick",year:"3rd",mentor_name:"",mentor_id:""}];
var initial_data_mentor=[{id:"1a",name:"Mentor1",dept:"Physics",students:[]},{id:"2a",name:"Mentor2",dept:"Chem",students:[]},{id:"3a",name:"Mentor3",dept:"bio",students:[]}];

app.post("/creatementor",(req,res)=>{
    try{
        if(req.body.mentor_name.length==0 || req.body.mentor_dept.length==0)
          {  throw "Can't enter empty details"}
        else{
            let temp_data_mentor={id:`${initial_data_mentor.length+1}a`,name:`${req.body.mentor_name}`,dept:req.body.mentor_dept,students:[]};
            initial_data_mentor.push(temp_data_mentor);
            console.log(temp_data_mentor);
            res.status(200).send("success"); 
        }
    }catch(err){
        res.status(500).send(err);
    }  
})
app.post("/createstudent",(req,res)=>{
    try{
        if(req.body.stud_name.length==0 || req.body.stud_year.length==0)
          {  throw "Can't enter empty details"}
        else{
            let temp_data_student={id:`${initial_data_student.length+1}d`,name:`${req.body.stud_name}`,year:req.body.stud_year,mentor_name:"",mentor_id:""};
            initial_data_student.push(temp_data_student);
            console.log(temp_data_student);
            res.status(200).send("success"); 
        }
    }catch(err){
        res.status(500).send(err);
    }  
})
app.get("/getstudents",(req,res)=>{
    console.log("WORKING???");
    res.json(initial_data_student);
})
app.get("/getmentors",(req,res)=>{
    console.log("WORKING_MM???");
    res.json(initial_data_mentor);
})
app.post("/addstudents/:id",(req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
    id_mentor=req.params.id.split("-")[0];
    name_m=req.params.id.split("-")[1];
    try{
        initial_data_mentor.forEach((mentor)=>{
            if(mentor.id==id_mentor){
                console.log(`${mentor.id} = ${id_mentor}`)
                mentor.students=mentor.students.concat(req.body);
            }
        })
        initial_data_student.forEach((stu)=>{
            req.body.forEach((sent)=>{
                if(sent.id==stu.id){
                    stu.mentor_name=name_m;
                    stu.mentor_id=id_mentor;
                }
            })
        })
        res.status(200).send("Students added!");
        console.log("new",initial_data_mentor);
    }catch(err){
        res.status(500).send(`Error:${err}`);
    }
})
app.post("/changementor/:id",(req,res)=>{
    let student_id=req.params.id;
    try{
        initial_data_student.forEach((s)=>{
            if(s.id==student_id){
                s.mentor_name=req.body.mentor_name;
                s.mentor_id=req.body.mentor_id;
            }
        })
        initial_data_mentor.forEach((m)=>{
            if(m.id==req.body.old_mentor_id){
                m.students=m.students.filter(s=>s.id!==req.params.id);
            }
            if(m.id==req.body.mentor_id){
                m.students.push({name:req.body.student_name,id:req.params.id})
            }
        })
        res.status(200).send("Mentor Changed!")
    }catch(err){
        res.status(500).send(`${err}`)
    }
})
app.get("/getmentor",(req,res)=>{
    
    try{
        
        res.status(200).json(initial_data_mentor);
    }catch(err){
        res.status(500);
    }
})
app.listen(process.env.PORT || 4040,()=>{
    console.log("server started");
})