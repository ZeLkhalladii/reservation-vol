var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var lisvolRouter = require('./routes/listvol');
var formPaimentRouter = require('./routes/formPaiment');
const nodemailer = require("nodemailer");

var mysql = require('mysql');
var connection  = require('../lib/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/listVol/',(req, res) =>{
    
  const {vielle_depart} = req.body;
  let sql = `SELECT * FROM vols WHERE ville_depart = '${vielle_depart}' AND nombre_places > 0`;
  console.log(sql);
  let query = connection.query(sql, (err, results) =>{
      if(err) throw err;
      res.render('listVol',{
          vols : results
      });
  });
});

var globalvolid = 0;
app.get('/listVol/:volId',(req, res) =>{
    const volId = req.params.volId;
    globalvolid = volId;
    var nombre_places_rest = 0;
    res.render('formPaiment',{
        id: volId,
        nombre_places_rest
    });
});





app.post('/save_reserv',(req,res) => {

 
      const nombre_places_selected = req.body.nombre_place;
      let sql4 = `SELECT * FROM vols WHERE id = 3`;
      let query = connection.query(sql4, (err, firstresult) =>{
          if(err) throw err;
          else{
              var nbrpls = firstresult[0];
              var nombre_places_rest = nbrpls.nombre_places;
              
              if(nombre_places_selected <=nombre_places_rest){
                  alertmsg = 'Succes';
                  let data = {nom:req.body.nom,prenom:req.body.prenom, email:req.body.email, telephone:req.body.telephone};
                  globalNom = req.body.nom;
                  globalPrenom = req.body.prenom;
                  globalEmail = req.body.email;
                  globalTelephone = req.body.telephone;
                  globalNombrePlaceSelected = req.body.nombre_place;
                  let sql = "INSERT INTO users Set ?";
                  let query = connection.query(sql, data,(err, results) =>{
                      if(err) throw err;
                      else{
                    
                          var datetime = new Date();
                          let data2 = {id_user:results.insertId ,id_vol:3, nombre_places:req.body.nombre_place,date_de_reservation:datetime};
                          let sql2 = "INSERT INTO reservation Set ?";
                          let query2 = connection.query(sql2, data2,(err, resultsreservation) =>{
                              if(err) throw err;
                              else{
                                  globalIdReservation =  resultsreservation.insertId
                                  const id_vol = req.body.id_vol;
                                  let sql3 = "UPDATE `vols` SET `nombre_places`=`nombre_places`-"+nombre_places_selected+" WHERE `id`="+globalvolid;
                                  let query3 = connection.query(sql3,(err, results) =>{
                                      if(err) throw err;
                                   

                                      res.render('email',{
                                          title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                                          volid : firstresult[0],
                                          nombre_places_rest : nombre_places_rest - nombre_places_selected,
                                          nombre_places_selected,
                                          allertt : ('<h1>Hello Express!</h1>'),
                                          alertmsg,
                                          OperationResult:'succes'
                                      });
                                      // end
                                  });
                              }
                          });
                          
                      }
                  });
              }else{
                  alertmsg = '';
                  res.render('email',{
                      title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                      volid : firstresult[0],
                      nombre_places_rest,
                      nombre_places_selected,
                      allertt : ('<h1>Hello Express!</h1>'),
                      alertmsg,
                      OperationResult:'errr'
                  });
              }
          }
          
      });
 






})


//send mail

//validation
app.get('/validation', (req, res)=> {
    
    //START SEND MAIL
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //   let testAccount = await nodemailer.createTestAccount();
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "tmail1058@gmail.com",
                pass: "test@2020",
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Crazy RH" <foo@example.com>', // sender address
            to: globalEmail, // list of receivers
            subject: "Hello 6", // Subject line
            // text: "Hello world?", // plain text body
            // html: "<b>Hello world?</b>", // html body
            // html: `this is message`
            // html: `<h1>Valider</a><hr><a href='http://localhost:3000/reserv/1'>confermation</a>`
            html: ` 
                <section style='background-color: #F5F5F5;'>
                    <center>
                        <div class='container border border-warning rounded' style='background-color: white;max-width:660px'>
                            <!-- <center> -->
                                <div style='background-color: #f96b13;padding: 4px;'></div>
                                <div style='width: 100%;'>
                                    <div style='display: flex; width: 100%;margin-top: 20px;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Vol ID : `+globalvolid+`</h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>Reservation ID : `+globalIdReservation+`</h4>
                                    </div>
                                    <div style='display: flex; width: 100%;margin-top: 20px;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Nom : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalNom+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Prenom : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalPrenom+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Email : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalEmail+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Telephone : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalTelephone+` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>
                                    <div style='display: flex; width: 100%;'>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:#4c535d;padding:2% 0% 2% 20%;text-align:left;width: 50%;margin: 2% 0%;'>Nombre de places : </h4>
                                        <h4 style='font-family:Arial,Helvetica,Verdana,sans-serif;font-size:18px;line-height:20px;color:black;padding:2% 0% 2% 0%;text-align:left;width: 50%;margin: 2% 0%;'>`+globalNombrePlaceSelected +` </h4>
                                    </div>
                                    <hr style=' width: 80%;padding: 2px; background-color: #bdc3c7; border: none;'>

                                    <div style='width: 100%;'>
                                        <!-- <hr> -->
                                        <a href='http://localhost:3000/succeeded/`+globalvolid+`/`+globalIdReservation+`/`+globalNom+`/`+globalPrenom+`/`+globalEmail+`/`+globalTelephone+`/`+globalNombrePlaceSelected+`' style='background:#30555e;border:1px solid #f96b13;text-decoration:none;padding:20px 30px;color:#ffffff;border-radius:4px;display:inline-block;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:20px'>Valider</a>
                                    </div>
                                    
                                </div>
                            <!-- </center> -->
                        </div>
                    </center>
                </section>`
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  
    main().catch(console.error);
    //END SEND MAIL
        
    res.render('validation');

});

//send mail





app.use('/formPaiment', formPaimentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
