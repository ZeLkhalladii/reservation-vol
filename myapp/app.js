var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var lisvolRouter = require('./routes/listvol');
var formPaimentRouter = require('./routes/formPaiment');

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
// app.use('/listVol', lisvolRouter);
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
              // var hid = '';
              
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
                              // res.redirect('/');
                              else{
                                  globalIdReservation =  resultsreservation.insertId
                                  // UPDATE `vols` SET `nombre_places`=`nombre_places`-1 WHERE `id`= 1
                                  const id_vol = req.body.id_vol;
                                  // let sql = "UPDATE `users` SET name='"+req.body.name+"',email='"+req.body.email+"',phone_no='"+req.body.phone_no+"' WHERE id ="+userId;
                                  // let sql3 = "UPDATE `vols` SET `nombre_places`=`nombre_places`-1 WHERE `id`="+id_vol;
                                  let sql3 = "UPDATE `vols` SET `nombre_places`=`nombre_places`-"+nombre_places_selected+" WHERE `id`="+globalvolid;
                                  let query3 = connection.query(sql3,(err, results) =>{
                                      if(err) throw err;
                                      // res.redirect('/');
                                      // start

                                      res.render('email',{
                                          title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                                          volid : firstresult[0],
                                          nombre_places_rest : nombre_places_rest - nombre_places_selected,
                                          nombre_places_selected,
                                          allertt : ('<h1>Hello Express!</h1>'),
                                          alertmsg
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
                      achkayen,
                      allertt : ('<h1>Hello Express!</h1>'),
                      alertmsg
                  });
              }
          }
          
      });
 






})




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
