const mysql = require('mysql');

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
});

exports.register = (req,res)=>
{
    console.log(req.body);
         //res.send('submit');
       const {name, email,password,passwordconfirm }=req.body ;
       
       db.query('SELECT email FROM users WHERE email=?',[email], (err,result)=>{
          if(err){
              console.log(err);
          } 
          if(result.length>0){
              return res.render('register',{
                  message: 'That email is already in use'})
          }
          else if(password !==passwordconfirm){
            return res.render('register',{
                message: 'Password not match'})
          }
          db.query('INSERT INTO users SET ?',{name:name , email:email , password:password},(err,result)=>{
              if(err){
                  console.log(err);

              }
              else{
                  console.log(result);
                  return res.render('register',{
                      message:'User registered.'
                })
              }
          })
       });
};

    
 exports.login= async(req,res)=>{
     try{
        console.log(req.body);
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).render('login',{
                message:'Pleade provide email or password.'
            })
        }
        db.query('SELECT * FROM users WHERE email=?',[email],async(err,result)=>{
            if(!result || (result[0].password!==password)){
                return res.status(401).render('login',{
                    message :'Email or password incorrect'
                })
            }
            else{
                 res.status(200).render('index');
            }
        })
     }
    catch(error){
console.log(error);
    }
 };