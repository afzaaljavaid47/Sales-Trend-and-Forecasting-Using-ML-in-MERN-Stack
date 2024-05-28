const express = require('express');
const app = express();
const mongoose = require("mongoose");
const {mongourl} = require('./config/keys');
var jwt=require('jsonwebtoken')
var nodemailer=require('nodemailer')
var cors = require('cors');
app.use(cors());
var fs=require('fs')
var parse=require('csv-parse')
mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology: true});

//Models Imports
var Reveneu_Model=require('./models/Reveneu')
var UserRegistrationModel=require('./models/UserRegistration')
var AdminRegistration=require('./models/AdminRegistration')
var Plan_Model=require('./models/Add_Plan')
var Action_Model=require('./models/Add_Action')
var multer = require('multer')
var fs = require('fs');
var path=require('path')

//End Model Imports

module.exports = (app)=>{
app.get('/',(req,res)=>{
        res.render('home')
})
app.post('/registration',(req,res)=>{
    var UserData=new UserRegistrationModel({
        fname:req.body.fname,
        lname:req.body.lname,
        uname:req.body.uname,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        category:'Free'
    })
    UserData.save((err,res)=>{
        if(err) throw err;
        console.log("Successfully !")
    })
})
app.get('/get_admin_info',(req,res)=>{
    var token=req.headers.token;
    var decoded=jwt.verify(token,'jwtPrivateKey')
    AdminRegistration.findOne({_id:decoded._id})
    .then(data=>{
        res.send({
            data:data
        })
    })
})
app.get('/profile_info',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
        res.send({
            profile:data
        })
    })
})
app.post('/update_plan',(req,res)=>{
    Plan_Model.updateOne({_id:req.body.id},{$set:{pname:req.body.ppname,pprice:req.body.ppprice}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})

app.post('/payment',(req,res)=>{
    var token=req.headers.token;
    var cat=req.body.cat;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    const Reveneu_Data=new Reveneu_Model({
        user_id:decoded._id,
        card_number:req.body.card_number,
        expiry_date:req.body.expiry,
        cvv:req.body.cvv,
        amount:req.body.amount,
        upgraded_package_name:req.body.cat
    })
  
    UserRegistrationModel.updateOne({_id:decoded._id},{$set:{category:cat}})
    .then(data=>{
        Reveneu_Data.save((err,res1)=>{
            if(err) throw err;
            console.log("Success Amount")
            res.send({
                data:data
            })
        })

    })
})

app.post('/update_action',(req,res)=>{
    Action_Model.updateOne({_id:req.body.id},{$set:{aname:req.body.aaname,aplan:req.body.aaplan}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})
app.post('/update_customer',(req,res)=>{
    UserRegistrationModel.updateOne({email:req.body.uemail},{$set:{fname:req.body.ufname,lname:req.body.ulname,uname:req.body.uuname,email:req.body.uemail,phone:req.body.uphone,password:req.body.upassword}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})

app.post('/update_admin',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    AdminRegistration.updateOne({_id:decoded._id},{$set:{uname:req.body.uname,email:req.body.email,phone:req.body.phone,password:req.body.password}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})

app.get('/get-data',(req,res)=>{
     UsersModel.find({})
     .then(data=>{
         res.send(data)
     })
 })

 app.get('/get_all_plans',(req,res)=>{
     Plan_Model.find({})
     .then(data=>{
         res.send(data);
     })
 })

 app.post('/password_reset',(req,res)=>{
    UserRegistrationModel.findOne({email:req.body.email})
    .then((data)=>{
    if(data)
    {   
    console.log('data found')
    async function main() {
    let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 465,
       secure: true, // true for 465, false for other ports
       auth: {
        user: 'salestrendandforecasting@gmail.com',
        pass: '9Xwt3ve0',
      },
     });
     let info = await transporter.sendMail({
       from: '"Sales Trend & Forecasting Using Data Mining Techniques" <salestrendandforecasting@gmail.com>',
       to: data.email,
       subject: "Password Reset", 
    //   text: "Hello world?", 
       html: "<h1>Welcome To 'Sales Trend & Forecasting Using Data Mining Techniques' ! </h1><p>\
       <h3>Hello "+data.fname+"</h3>\
       If You are requested to reset your password then click on below link<br/>\
       <a href='http://localhost:3000/change_password/"+data._id+"'>Click On This Link</a>\
       </p>",
     });
     if(info.messageId)
     {
        res.send({data:'please check your email to reset your password'})
        console.log('please check your email to reset your password')
    }
     else
     {
       res.send({data:'Some errors, try again!'})
       console.log('Some errors, try again!')
     }
   }
   main().catch(console.error);   
    }
    else
    {
        res.send({data:'error'})
    }
    })
})


app.post('/admin_password_reset',(req,res)=>{
    console.log(req.body.email)
    AdminRegistration.findOne({email:req.body.email})
    .then((data)=>{
    if(data)
    {   
    console.log('data found')
    async function main() {
    let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 465,
       secure: true, // true for 465, false for other ports
       auth: {
        user: 'salestrendandforecasting@gmail.com',
        pass: '9Xwt3ve0',
      },
     });
     let info = await transporter.sendMail({
       from: '"Sales Trend & Forecasting Using Data Mining Techniques" <salestrendandforecasting@gmail.com>',
       to: data.email,
       subject: "Password Reset", 
    //   text: "Hello world?", 
       html: "<h1>Welcome To 'Sales Trend & Forecasting Using Data Mining Techniques' ! </h1><p>\
       <h3>Hello "+data.uname+"</h3>\
       If You are requested to reset your password then click on below link<br/>\
       <a href='http://localhost:3000/admin_change_password/"+data._id+"'>Click On This Link</a>\
       </p>",
     });
     if(info.messageId)
     {
        res.send({data:'please check your email to reset your password'})
        console.log('please check your email to reset your password')
    }
     else
     {
       res.send({data:'Some errors, try again!'})
       console.log('Some errors, try again!')
     }
   }
   main().catch(console.error);   
    }
    else
    {
        res.send({data:'error'})
    }
    })
})


app.post('/update_plan',(req,res)=>{
    Plan_Model.updateOne({_id:req.body.id},{$set:{pname:req.body.ppname,pprice:req.body.ppprice}})
})

app.post('/add_plan',(req,res)=>{
    var plan_data=new Plan_Model({
        pname:req.body.pname,
        pprice:req.body.pprice
    })
    plan_data.save((err,res)=>{
        if(err) throw err;
    })
})

app.post('/add_action',(req,res)=>{
    var action_data=new Action_Model({
        aname:req.body.aname,
        aplan:req.body.aplan
    })
    action_data.save((err,res)=>{
        if(err) throw err;
    })
})


app.post('/admin_registration',(req,res)=>{
    var admin_data=new AdminRegistration({
        uname:req.body.uname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    })
    admin_data.save((err,res)=>{
        if(err) throw err;    
    })
})
app.post('/delete_customer/:id',(req,res)=>{
    console.log(req.params.id)
    UserRegistrationModel.deleteOne({_id:req.params.id})
    .then(res1=>{
        res.send({
            data:"Customer Deleted Successfully ! "
        })
    }) 
})

app.get('/get_all_plans_related_data/:id',(req,res)=>{
    var pname=req.params.id
    console.log(pname)
    Action_Model.find({aplan:pname})
    .then(data=>{
        res.send(data)
    })
})

app.post('/delete_plan/:id',(req,res)=>{
    console.log(req.params.id)
    Plan_Model.deleteOne({_id:req.params.id})
    .then(res1=>{
        res.send({
            data:"Plan Deleted Successfully ! "
        })
    }) 
})

app.post('/delete_action/:id',(req,res)=>{
    console.log(req.params.id)
    Action_Model.deleteOne({_id:req.params.id})
    .then(res1=>{
        res.send({
            data:"Action Deleted Successfully ! "
        })
    }) 
})

app.get('/all_plans_info',(req,res)=>{
    Plan_Model.find({})
     .then(data=>{
         res.send(data);
     })
 })
 

app.get('/all_custumers_info',(req,res)=>{
   UserRegistrationModel.find({})
    .then(data=>{
        res.send(data);
    })
})

app.get('/all_reveneu_info',(req,res)=>{
    Reveneu_Model.find({})
     .then(data=>{
         res.send(data);
     })
 })

app.get('/get_plan_data/:id',(req,res)=>{
    Plan_Model.findOne({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
})
app.get('/get_count_data',(req,res)=>{
    Action_Model.countDocuments({})
    .then(data=>{
    Plan_Model.countDocuments({})
    .then(data1=>{
    UserRegistrationModel.countDocuments({})
    .then(data2=>{
        Reveneu_Model.aggregate([ {
            $group: {
             _id: null,
             "TotalAmount": {
             $sum: "$amount"
              }
             }
          } ] )
          .then(data3=>{
              console.log(data3)
              res.send({atotal:data,ptotal:data1,utotal:data2,reveneu_total:data3})
          })
     
    })
    })    
    })
})
app.get('/get_customer_data/:id',(req,res)=>{
    UserRegistrationModel.findOne({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
})
app.get('/get_action_data/:id',(req,res)=>{
    Action_Model.findOne({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
})
app.get('/all_actions_info',(req,res)=>{
    Action_Model.find({})
     .then(data=>{
         res.send(data);
     })
 })

app.post('/admin_login',(req,res)=>{
    var user=new AdminRegistration({
        email:req.body.email,
        password:req.body.password
    })
    AdminRegistration.findOne({email:user.email,password:user.password})
    .then(data=>{
        var errors;
        var token;
        if(!data)
        {
            errors="Invalid E-Mail or Password";
        }
        else
        {
            token=jwt.sign({ _id:data._id },'jwtPrivateKey');
        }
        res.send({
              error:errors,
              tokens:token
        })
    })
    })
    
app.post('/login',(req,res)=>{
     var user=new UserRegistrationModel({
         email:req.body.email,
         password:req.body.password
     })
    UserRegistrationModel.findOne({email:user.email,password:user.password})
     .then(data=>{
        var errors;
        var token;
        if(!data)
        {
            errors="Invalid E-Mail or Password";
        }
        else
        {
            token=jwt.sign({ _id:data._id },'jwtPrivateKey');
        }
        res.send({
            error:errors,
            tokens:token
        })
     })
    
 })
let userID ;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv' ) {
            return cb(new Error('Only csv are allowed'))
        }
        cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null,  userID +'.csv');  
  }
});
var upload = multer({ storage: storage,  limits: { fileSize: 100 * 1024 * 1024   } }).single('file');

 app.post('/upload_data',(req,res)=>{
     console.log('Upload Data Body')
     var token=req.headers.token
     var decoded=jwt.verify(token, 'jwtPrivateKey')
     UserRegistrationModel.findOne({_id:decoded._id})
     .then(data=>{
     if(data)
      {
        console.log('data found')
        userID=data._id;
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
             return res.send('File Uploaded Successfully')
         })
      var dir = `\\excel_files\\${userID}`;
      if (!fs.existsSync(__dirname+dir)){
          fs.mkdirSync(__dirname+dir);
        }
        UserRegistrationModel.updateOne({_id:userID},{DataUploaded: true },function(err, res) {
            if (err) {
                throw err
                console.log(err);
            }   
        });
      }
     })
 })

 app.post('/update_reset_password',function(req, res){
    UserRegistrationModel.findOne({ _id: req.body.id }, function (errorFind, userData) {
        if(userData._id==req.body.id)
        {
            var token
            token=jwt.sign({ _id:userData._id },'jwtPrivateKey');
            UserRegistrationModel.updateOne({_id:userData._id},{password:req.body.password})
            .then(data=>{
                res.send({data:'Password reset successfully!',tokens:token})
            })
        }
        else if(errorFind)
        {
            res.send('Some errors try again')
        }
    }
    );
})

app.post('/update_admin_reset_password',function(req, res){
      AdminRegistration.findOne({ _id: req.body.id }, function (errorFind, userData) {
        if(userData._id==req.body.id)
        {
            var token
            token=jwt.sign({ _id:userData._id },'jwtPrivateKey');
       AdminRegistration.updateOne({_id:userData._id},{password:req.body.password})
            .then(data=>{
                res.send({data:'Password reset successfully!',tokens:token})
            })
        }
        else if(errorFind)
        {
            res.send('Some errors try again')
        }
    }
    );
})


app.get('/check_is_upload',(req,res)=>{
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       res.send({data:data.DataUploaded,file:'http://localhost:5000/public/'+data._id +'.csv'})  
       console.log('localhost:5000/public/'+data._id +'.csv')     
     }
    })
})


 app.post('/sent-data',(req,res)=>{
     var usersData=new UsersModel({
         uname:req.body.uname,
         email:req.body.email,
         password:req.body.password
     })
     usersData.save((err,res)=>{
         if(err) throw err
         console.log('Successfully !')
     })
    res.send(JSON.stringify(req.body))
})
app.get('/preview_data', (req, res)=> { 
    csvData=[]
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
    fs.createReadStream(`./public/${data._id}.csv`)
    .pipe(
        parse({
            delimiter:','
        })
    )
    .on('data',function(dataRow){
        csvData.push(dataRow)
    })
    .on('end',function(){
        console.log(csvData)
        res.status(200).json({data:csvData})
    })
}
})
})
app.post('/send-contact-email',(req,res)=>{
    async function main() {
    let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 465,
       secure: true, // true for 465, false for other ports
       auth: {
         user: 'salestrendandforecasting@gmail.com',
         pass: '9Xwt3ve0',
       },
     });
     let info = await transporter.sendMail({
       from: `"${req.body.name}" <${req.body.email}>`,
       to: "salestrendandforecasting@gmail.com",
       subject: req.body.subject, 
       html: 'This Email is from : '+req.body.email+'<br></br> Subject : '+req.body.subject+'<br></br> Message : '+ req.body.message
     });
     if(info.messageId)
     {
        res.send({data:'Thanks for your message. We will be touch with you as soon as possible.'})
        console.log('Thanks for your message. We will be touch with you as soon as possible.')
    }
     else
     {
       res.send({data:'Some errors, try again!'})
       console.log('Some errors, try again!')
     }
   }
   main().catch(console.error);   
})


app.get('/check_is_upload_churn',(req,res)=>{
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       res.send({data:data.DataUploaded_Churn,file:'http://localhost:5000/public/'+data._id +'churn.csv'})  
       console.log('localhost:5000/public/'+data._id +'churn.csv')     
     }
    })
})

app.get('/check_is_upload_uplift',(req,res)=>{
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       res.send({data:data.DataUploaded_Uplift,file:'http://localhost:5000/public/'+data._id +'uplift.csv'})  
       console.log('localhost:5000/public/'+data._id +'uplift.csv')     
     }
    })
})
app.get('/check_is_upload_market',(req,res)=>{
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       res.send({data:data.DataUploaded_Market,file:'http://localhost:5000/public/'+data._id +'market.csv'})  
       console.log('localhost:5000/public/'+data._id +'market.csv')     
     }
    })
})
app.post('/update_customer_profile',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    UserRegistrationModel.updateOne({_id:decoded._id},{$set:{fname:req.body.fname,lname:req.body.lname,uname:req.body.uname,email:req.body.email,phone:req.body.phone,password:req.body.password}})
    .then(data=>{
        if(data)
        {
            console.log('Data Found'+data.id)
            res.send({
                data:data
            })    
        }
        else
        {
            res.send({data:'error'})
        }
        
    })
})



var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv' ) {
            return cb(new Error('Only csv are allowed'))
        }
        cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null,  userID +'churn.csv');  
  }
});
var upload1 = multer({ storage: storage1,  limits: { fileSize: 100 * 1024 * 1024   } }).single('file');


 app.post('/upload_data_churn',(req,res)=>{
    console.log('Upload Data Churn Body')
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       console.log('churn data found')
       userID=data._id;
       upload1(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
            return res.send('File Uploaded Successfully')
        })
     var dir = `\\excel_files\\${userID}`;
     if (!fs.existsSync(__dirname+dir)){
         fs.mkdirSync(__dirname+dir);
       }
       UserRegistrationModel.updateOne({_id:userID},{DataUploaded_Churn: true },function(err, res) {
           if (err) {
               throw err
               console.log(err);
           }   
       });
     }
    })
})

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv' ) {
            return cb(new Error('Only csv are allowed'))
        }
        cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null,  userID +'uplift.csv');  
  }
});
var upload2 = multer({ storage: storage2,  limits: { fileSize: 100 * 1024 * 1024   } }).single('file');


 app.post('/upload_data_uplift',(req,res)=>{
    console.log('Upload Data Uplift Body')
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       console.log('Uplift data found')
       userID=data._id;
       upload2(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
            return res.send('File Uploaded Successfully')
        })
     var dir = `\\excel_files\\${userID}`;
     if (!fs.existsSync(__dirname+dir)){
         fs.mkdirSync(__dirname+dir);
       }
       UserRegistrationModel.updateOne({_id:userID},{DataUploaded_Uplift: true },function(err, res) {
           if (err) {
               throw err
               console.log(err);
           }   
       });
     }
    })
})

var storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.csv' ) {
            return cb(new Error('Only csv are allowed'))
        }
        cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null,  userID +'market.csv');  
  }
});
var upload3 = multer({ storage: storage3,  limits: { fileSize: 100 * 1024 * 1024   } }).single('file');


 app.post('/upload_data_market',(req,res)=>{
    console.log('Upload Data Uplift Body')
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
       console.log('Uplift data found')
       userID=data._id;
       upload3(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
            return res.send('File Uploaded Successfully')
        })
     var dir = `\\excel_files\\${userID}`;
     if (!fs.existsSync(__dirname+dir)){
         fs.mkdirSync(__dirname+dir);
       }
       UserRegistrationModel.updateOne({_id:userID},{DataUploaded_Market: true },function(err, res) {
           if (err) {
               throw err
               console.log(err);
           }   
       });
     }
    })
})

app.get('/all_admins_info',(req,res)=>{
    AdminRegistration.find({})
     .then(data=>{
         res.send(data);
     })
 })

}