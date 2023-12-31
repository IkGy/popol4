const express = require('express');
const Store = require('../models/store');
const router = express.Router();

router
  .get('/admin',(req,res,next)=>{
    Store.findAll()
    .then((response)=>{
      console.log(response);  
      res.status(201).send(response)
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).end();
    })
  })

  .put('/admin',(req,res,next)=>{
    console.log(req.body);
    Store.update({
      status:req.body.status
    },{
      where:{id:req.body.id}
    })
    res.status(201).end()
  })
  .delete('/admin',(req,res,next)=>{
    console.log(req.body);
    Store.destroy({where:{id:req.body.id}})
    .then(()=>{
      res.status(201).end();
    })
    .catch(()=>{
      res.status(501).end();
    })
  })

  .post('/admin',(req,res,next)=>{
    try {
      console.log(req.body);
      Store.create({
        name:req.body.storeadd,
        address:req.body.add,
        phone:req.body.tell,
        email:req.body.email,
        oner:req.body.name,
        status:3,//승인 대기중
        created_at:new Date(),
        updated_at:new Date(),
      })
      res.status(201).send();
    } catch (error) {
      console.log(error);
      res.status(501).end();
    }
  }
)

module.exports = router;