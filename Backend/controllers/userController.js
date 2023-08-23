const userModel = require('../models/user')
const admin=require('../Middleware/admin')
const auth = require('../Middleware/auth')

function add(req, res){
    userModel.create({...req.body},(err,userData)=>{
        if(!err) return res.status(201).json(userData);
        res.status(500).json({Error:"DB error"});
    })

    console.log(req.body);
}

function list(req,res){
    let users =[]
    userModel.find({},(err, data)=>{
        users = data
        if(!err) return res.status(201).json(users);
        res.status(500).json({Error:"DB error"});
        
    })
}


function getById(req,res){
    const {id}= req.params
    userModel.findById(id , (err ,data)=>{
        user =data
    if (!err) return res.status(200).json(user)
    res.status(500).json({Error : "DB_error"})          
    }) 
}

function remove(req , res) {
    const {id}= req.params
    const {targ} = req.query
    userModel.findById(id , (err ,data)=>{
        user =data.isAdmin
    if(!err){
        if(user){
            userModel.findById(targ , (err ,data)=>{
                user2 =data.isAdmin
                if(!err){
                    if(!user2){
                        userModel.findByIdAndDelete(targ , (err)=>{
                            if (!err){
                                res.send( "deleted");
                            }
                            else{
                                console.log(err);
                            }
                         })

                    } else {
                        res.status(500).json("target is admin zayk")  
                    }
                } else{
                    console.log(err);
                }
            })
        } else {
            res.status(500).json("you not admin")
        }
    } else {
       console.log(err);
    }  
    }) 
}



function edit(req , res) {
    const {id}= req.params
    const {targ} = req.query
    let {firstName} = req.body
    let {lastName} =  req.body
    let {age} =  req.body
    let {email} =  req.body
    let {password} =  req.body
    let {isAdmin} = req.body
    userModel.findById(id , (err ,data)=>{
        user =data.isAdmin
    if(!err){
        if(user){
            userModel.findById(targ , (err ,data)=>{
                user2 =data.isAdmin
                if(!err){
                    if(!user2){
                        userModel.findByIdAndUpdate(targ , {firstName , lastName , age ,email,password,isAdmin }  , (err)=>{
                            if (!err){
                                userModel.findById(targ ,(err,data)=>{
                                    if (!err) return res.status(201).json(data)
                                        console.log(err)
                                        res.status(500).json({Error : "DB_error"})
                                })
                            }
                            else{
                                console.log(err);
                            }
                         })

                    } else {
                        res.status(500).json("target is admin zayk")  
                    }
                } else{
                    console.log(err);
                }
            })
        } else {
            res.status(500).json("you not admin")
        }
    } else {
       console.log(err);
    }  
    }) 

}



module.exports = {add , list , getById , remove ,edit}