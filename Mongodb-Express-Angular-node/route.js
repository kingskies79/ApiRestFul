
const express = require ('express');

const router =  express.Router();

var user = require('./UserSchema');


router.get('/users', (req,res,nex)=>{
    user.find((err,users) =>{
        if(err){
             res.json(err);
        }else{
             res.json(users);
        }
    });

})

router.get('/user/:id', (req,res,nex)=>{
    user.findById(req.params.id,(err,users) =>{
        if(err){
             res.json(err);
        }else{
             res.json(users);
        }
    });

})

router.post('/user', (req,res,next)=>{
    let newUser = new user({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email
    })
    newUser.save((err)=> {
        if(err){
            res.json(err);
        }else{
            res.json({msg:'User has been added'});
        }
    })
})

router.put('/user/:id', (req,res,next)=>{
    user.findByIdAndUpdate(req.params.id,{
        $set: {
            _id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
    }, (err,resolve)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg:'User has been updated'});
        }
    }
    )
})
router.delete('/user/:id', (req,res,next)=>{
    user.remove({_id:req.params.id},(err)=>{
       if(err) {
           res.json(err);
       }else{
           res.json({msg:'The user has been deleted'})       }
    })
})
module.exports=router;