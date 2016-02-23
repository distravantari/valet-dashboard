var appControllers = angular.module('appControllers', []);
var domain = 'http://52.76.73.21:3000/api';
var domain2 = 'http://52.76.211.241:3000/api';
var things = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTI0ODM4OTd9.u89Rk5KYnbLAcsGB-FasVKrIgIJQIaKrRaym4hm7r_0';
var things2 = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTI0ODM4OTd9.u89Rk5KYnbLAcsGB-FasVKrIgIJQIaKrRaym4hm7r_0';

//login.html
var user,pass;
appControllers.controller('LoginController',['$scope','$http',
    function($scope,$http){
      $('.homeb').addClass('hidden');
      $('.driverb').addClass('hidden');
      $('.transb').addClass('hidden');
      $('.histob').addClass('hidden');
      $('.regb').addClass('hidden');

      $scope.userlogin = function(){
        user = $scope.form.username;
        pass = $scope.form.password;

        if (user == "valet@uncle" && pass == 'thisisnode8') {
          $('.homeb').removeClass('hidden');
          $('.driverb').removeClass('hidden');
          $('.transb').removeClass('hidden');
          $('.histob').removeClass('hidden');
          $('.regb').removeClass('hidden');
          window.location.assign("#/dashboard");
        }
      }
    }
]);
// end of login.html

//driverC
appControllers.controller('DriverController',['$scope','$http',
    function($scope,$http){
      $('.homeb').removeClass('active');
      $('.transb').removeClass('active');
      $('.histob').removeClass('active');
      $('.driverb').addClass('active');
      $('.regb').removeClass('active');

      $http.get(domain+'/driverC'+things2).success(function(data){
          $scope.drivers=data.message;
      });
    }
]);
//end of driver

//addtrans
appControllers.controller('AddtransController',['$scope','$http',
    function($scope,$http){
      $('.homeb').removeClass('active');
      $('.transb').removeClass('active');
      $('.histob').removeClass('active');
      $('.driverb').removeClass('active');
      $('.regb').removeClass('active');

      $.get(domain+'/driverC'+things2).success(function(data1){
          // alert(data.message.length);
          alldriver = Number(data1.message.length);
          $('.drivercount').text(alldriver);

          $http.get(domain+'/driverOn'+things2).success(function(data){
              //ng-repeat
              $scope.drivers=data.message;

              // alert(data.message.length);
              $('.driveronline').text(data.message.length);
              onlineD = data.message.length;
              // driver ofline
              var offlineD = Number(alldriver)-Number(onlineD);
              // alert(offlineD);
              $('.driveroff').text(offlineD);
              // alert("total: "+alldriver+" on: "+onlineD+" of: "+offlineD);
          });
      });

      $scope.setID = function(x) {
        localStorage.setItem("driverId", x);
        $('.drID').val(x);
      }

      $scope.request = function() {
        //body
        //not using local storage
        // usern = $scope.reg.username;
        // pnum = $scope.reg.pnum;
        //using local storage
        localStorage.setItem("usern", $scope.reg.username);
        localStorage.setItem("pnum", $scope.reg.pnum);
        // alert("local "+localStorage.getItem("usern"));

        //pasword generator
        // function randomString() {
        //     var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        //     var string_length = 8;
        //     var randomstring = '';
        //     for (var i=0; i<string_length; i++) {
        //         var rnum = Math.floor(Math.random() * chars.length);
        //         randomstring += chars.substring(rnum,rnum+1);
        //     }
        //     return randomstring;
        // }
        //end of generator
        // pass = randomString();

        //check username. no user on database == auto register
        // $.ajax({
        //     url: domain + '/register',
        //     dataType: 'text',
        //     method: 'POST',
        //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        //     data: {
        //       username:usern,
        //       number:pnum,
        //       password:pass,
        //       token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
        //     },
        //     success: function(response){
        //       //send email to user about the registration and password
        //       $.ajax({
        //           url: domain2 + '/web-reg-email',
        //           dataType: 'text',
        //           method: 'POST',
        //           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        //           data: {
        //             mailto:usern,
        //             pass:pass,
        //             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
        //           },
        //           success: function(response){
        //           },
        //           error: function(xhr, status, error){
        //             console.log('error '+trans);
        //           },
        //           complete: function(){
        //          }
        //         });
        //     },
        //     error: function(xhr, status, error){
        //       console.log('error '+trans);
        //     },
        //     complete: function(){
        //    }
        //   });
        //end of register

        //not using local storage
        // notif = $scope.reg.notif;
        // fee = $scope.reg.fee;
        // remark = $scope.reg.remark;
        // destination = $scope.reg.destination;
        // pickUpAd = $scope.reg.pickUpAd;
        // idDriver = $scope.reg.driverId;
        //using localStorage
        localStorage.setItem("notif", $scope.reg.notif);
        localStorage.setItem("fee", $scope.reg.fee);
        localStorage.setItem("remark", $scope.reg.remark);
        localStorage.setItem("destination", $scope.reg.destination);
        localStorage.setItem("pickUpAd", $scope.reg.pickUpAd);
        localStorage.setItem("driverId", $scope.reg.driverId);
        if (localStorage.getItem("driverId") == 'undefined') {
          localStorage.setItem("driverId", 'no');
        }

        //make it blurr
        $('.all').addClass('blur');
        $('.loading').removeClass('hidden');

        //post findDriver/set driver manually
        $.ajax({
          url: domain + '/web-transaction',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            username:localStorage.getItem("usern"),
            notif:0,
            fee:localStorage.getItem("fee"),
            remark:localStorage.getItem("remark"),
            destination:localStorage.getItem("destination"),
            pickUpAddress:localStorage.getItem("pickUpAd"),
            driverId:localStorage.getItem("driverId"),
            pickUp:'1.33406787347509;103.866829164326',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            var obj = JSON.parse(response);
            var temp = obj.message.split(" ");
            var trans = temp[1];

            // check driverId nya kosong apa engga
            // kalo kosong findNearestDriver else gausah findNearestDriver
            if (localStorage.getItem("driverId") == 'no') {
              //timeout, berhenti di waktu tertentu
              alert("you are not set any driver to this transaction, continue ?");
              var searching = setTimeout(function(){ findDriver() }, 3000);
              function findDriver (){
                $.ajax({
                  url: domain + '/findNearestDriver',
                  dataType: 'text',
                  method: 'POST',
                  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                  data: {
                    transId:trans,
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                  },
                  success: function(response){
                    var obj = JSON.parse(response);
                    if (obj.message == 'success ') {
                      console.log(obj.message);

                      //searchDriver
                      setTimeout(function(){ searchDriver() }, 20000);
                      function searchDriver (){
                        $.ajax({
                          url: domain + '/searchDriver',
                          dataType: 'text',
                          method: 'POST',
                          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                          data: {
                            username:localStorage.getItem("usern"),
                            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                          },
                          success: function(response){
                            var obj = JSON.parse(response);
                            if(obj.message == 'keep searching'){
                              // console.log(obj.message);
                              console.log('searching');
                              $('.waiting').addClass('hidden');
                              $('.ka').removeClass('hidden');
                            }else{
                              // stopSearchDriverAnswer();
                              var temp = obj.message.split(';');
                              var temp2 = temp[1];

                              //driver found
                              $('.waiting').addClass('hidden');
                              //set driver info //name,phone,credit
                              $.ajax({
                                  url: domain + '/driver',
                                  dataType: 'text',
                                  method: 'POST',
                                  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                  data: {
                                    driverId:temp[1],
                                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                                  },
                                  success: function(response){
                                    var inf = JSON.parse(response);
                                    // alert(inf.Driver);
                                    $('.driver-name').text(inf.Driver[0].name);
                                    $('.driver-phone').text(inf.Driver[0].phone);
                                    $('.driver-credit').text('$'+inf.Driver[0].credit);
                                  },
                                  error: function(xhr, status, error){
                                    console.log('error '+trans);
                                  },
                                  complete: function(){
                                 }
                                });
                              $('.ta').removeClass('hidden');
                              //end of driver

                              // console.log('driver found, with ID = '+temp2);
                            }
                          },
                          error: function(xhr, status, error){
                            console.log('error');
                          },
                          complete: function(){
                         }
                        });
                      }
                    }else{
                      console.log(obj.message);
                      $('.waiting').addClass('hidden');
                      $('.ka').removeClass('hidden');
                      // alert('no driver found, try again ?');
                    }
                  },
                  error: function(xhr, status, error){
                    console.log('error '+trans);
                  },
                  complete: function(){
                 }
                });
              }
            }else{
              alert('set driver manually?');
              //searchDriver
              setTimeout(function(){ searchDriver() }, 15000);
              function searchDriver (){
                $.ajax({
                  url: domain + '/searchDriver',
                  dataType: 'text',
                  method: 'POST',
                  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                  data: {
                    username:localStorage.getItem("usern"),
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                  },
                  success: function(response){
                    var obj = JSON.parse(response);
                    if(obj.message == 'keep searching'){
                      // console.log(obj.message);
                      console.log('searching');
                      $('.waiting').addClass('hidden');
                      $('.ka').removeClass('hidden');
                    }else{
                      // stopSearchDriverAnswer();
                      var temp = obj.message.split(';');
                      var temp2 = temp[1];

                      //driver found
                      $('.waiting').addClass('hidden');
                      //set driver info //name,phone,credit
                      $.ajax({
                          url: domain + '/driver',
                          dataType: 'text',
                          method: 'POST',
                          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                          data: {
                            driverId:temp[1],
                            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                          },
                          success: function(response){
                            var inf = JSON.parse(response);
                            // alert(inf.Driver);
                            $('.driver-name').text(inf.Driver[0].name);
                            $('.driver-phone').text(inf.Driver[0].phone);
                            $('.driver-credit').text('$'+inf.Driver[0].credit);
                          },
                          error: function(xhr, status, error){
                            console.log('error '+trans);
                          },
                          complete: function(){
                         }
                        });
                      $('.ta').removeClass('hidden');
                      //end of driver

                      // console.log('driver found, with ID = '+temp2);
                    }
                  },
                  error: function(xhr, status, error){
                    console.log('error');
                  },
                  complete: function(){
                 }
                });
              }
            }
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){
         }
        });
        //end of post findDriver/set driver manually
      }
    }
]);
//addtrans

//driverC
appControllers.controller('RegisterController',['$scope','$http',
    function($scope,$http){
      $('.homeb').removeClass('active');
      $('.transb').removeClass('active');
      $('.histob').removeClass('active');
      $('.driverb').removeClass('active');
      $('.regb').addClass('active');

      $scope.reg = function() {
        // input
        var name = $scope.reg.names;
        var alias =  $scope.reg.alias;
        var IMEI = $scope.reg.IMEI;
        var phone = $scope.reg.phone;
        var postalCode = $scope.reg.postalCode;
        var photo = $scope.reg.photo;
        var date = $scope.reg.date;
        var phoneModel = $scope.reg.phoneModel;
        var email = $scope.reg.email;
        var licenceNumber = $scope.reg.licenceNumber;
        // end of input

        // alert(name+" "+alias+" "+IMEI+" "+phone+" "+postalCode+" "+photo+" "+date+" "+phoneModel+" "+email+" "+licenceNumber);
        $.ajax({
          url: domain + '/re',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            name: name,
            alias:alias,
            IMEI:IMEI,
            phone:phone,
            date:date,
            phoneModel:phoneModel,
            email:email,
            licenceNumber:licenceNumber,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            alert('success');
            document.location.reload();
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){
         }
       });
      }


    }
]);
//end of driver

//transaction
appControllers.controller('TransactionController',['$scope','$http',
    function($scope,$http){
      $('.homeb').removeClass('active');
      $('.histob').addClass('active');
      $('.driverb').removeClass('active');
      $('.transb').removeClass('active');
      $('.regb').removeClass('active');

      $http.post(domain+'/allHistory'+things2).success(function(data){
          $scope.transaction=data.message;
      });
    }
]);
//end of transaction

//On-goingController
appControllers.controller('On-goingController',['$scope','$http',
    function($scope,$http){
      $('.homeb').removeClass('active');
      $('.histob').removeClass('active');
      $('.driverb').removeClass('active');
      $('.transb').addClass('active');
      $('.regb').removeClass('active');

      $http.post(domain+'/allTransaction'+things2).success(function(data){
          $scope.transaction=data.message;
      });
    }
]);
// end of On-goingController

// dashboard controller
appControllers.controller('DashboardController',['$scope','$http',
    function($scope,$http){
      $('.username').data(user);

      $('.driverb').removeClass('active');
      $('.transb').removeClass('active');
      $('.Histob').removeClass('active');
      $('.homeb').addClass('active');
      $('.regb').removeClass('active');

      //logout
      $(".logout").hover(function(){
          $(this).attr("src", "assets/img/monkey3.png");
        }, function(){
          $(this).attr("src", "assets/img/monkey.png");
      });

      // server uptime LIVE
      $.post(domain+'/authenticate').success(function(data){
          // alert(data.message.length);
          $('.serverstatus').text('UP');
          $('.serverspeed').text('| 356ms.');
          $('.serverimg').attr("src",'assets/img/up.png');

      }).error(function(err){
        // alert('DOWN');
        $('.serverstatus').text('DOWN');
        $('.serverimg').attr("src",'assets/img/down.png');
      });

      // server uptime TESTING
      $.post(domain2+'/authenticate').success(function(data){
          // alert(data.message.length);
          $('.serverstatus2').text('UP');
          $('.serverspeed2').text('| 356ms.');
          $('.serverimg2').attr("src",'assets/img/up.png');

      }).error(function(err){
        // alert('DOWN');
        $('.serverstatus2').text('DOWN');
        $('.serverimg2').attr("src",'assets/img/down.png');
      });


      var alldriver = 0;
      var onlineD = 0;
      // $scope.drivers = [{}];
      // count driver
      $.get(domain+'/driverC'+things2).success(function(data1){
          // alert(data1);
          alldriver = Number(data1.message.length);
          $('.drivercount').text(alldriver);

          $http.get(domain+'/driverOn'+things2).success(function(data){
              //ng-repeat
              $scope.drivers=data.message;

              // alert(data.message.length);
              $('.driveronline').text(data.message.length);
              onlineD = data.message.length;
              // driver ofline
              var offlineD = Number(alldriver)-Number(onlineD);
              // alert(offlineD);
              $('.driveroff').text(offlineD);
              // alert("total: "+alldriver+" on: "+onlineD+" of: "+offlineD);
          });
      });

      // count driver driveronjob
      $.get(domain+'/driverStartJob'+things2).success(function(data){
          // alert(data.message.length);
          $('.driveronjob').text(data.message.length);
      });

      //total user
      $.get(domain+'/Allusers'+things2).success(function(data){
          // alert(data.message.length);
          $('.totaluser').text(data.message.length);
      });
      $.get(domain+'/regToday'+things2).success(function(data){
          // alert(data.message.length);
          $('.usertoday').text(data.message.length);
      });

      //request list
      $.get(domain+'/transStatus'+things2).success(function(data){
          var res = '',res2 = '';
          for (var i = 0; i < data.message.length; i++) {
            res +=
            "username: <br><b>"+data.message[i].username+"</b><br><br>"+
            "remark: <br>"+data.message[i].remark+"<br>"+
            "pick up: <br>"+data.message[i].pickUpAddress+"<br>"+
            "destination: <br>"+data.message[i].destinationAddress+"<br>"+
            "get driver? <br>"+data.message[i].driverId+"<br>"+
            "<hr>";
          }
          $('.reqList').html(res);
          $('.reqTot').text(data.message.length);

          res2 +=
          "username: <br><b>"+data.message[data.message.length-1].username+"</b><br>"+
          "get driver?  "+data.message[data.message.length-1].driverId+"<br>"+
          "<hr>";
          $('.newTrans').html(res2);
          var date = data.message[data.message.length-1].create.split('T');
          var time = date[1].split('.');
          $('.newTransDate').text(date[0]);
          $('.newTransTime').text(" "+time[0]);

          //notification
          var audio = new Audio('assets/audio/notif2.mp3');
          setTimeout(notif(), 500);
          function notif(){
            if (localStorage.getItem("notification")==null) {
              localStorage.setItem("notification",time[0]);
            }else{
              if(time[0]!=localStorage.getItem("notification")){
                console.log("new trans");
                audio.play();
                localStorage.setItem("notification",time[0]);
              }else{
                // audio.play();
                console.log("false alarm");
              }
            }
          }
      });

      //action log user
      var userLog,  userLogReg, userLogCancel;
      $.get(domain+'/userLog'+things2).success(function(data){
          // alert(data.message.length);
          userLog = data.message.length;
      });
      $.get(domain+'/userLogReq'+things2).success(function(data){
          // alert(data.message.length);
          userLogReg = data.message.length;
          userLogCancel = Number(userLog) - Number(userLogReg);

          var request = Number(userLogReg)/Number(userLog)*100;
          var cancel = Number(userLogCancel)/Number(userLog)*100;

          $('.userreg').text(request.toFixed(1));
          $('.usercancel').text(cancel.toFixed(1));
          $('.userlogtot').text(userLog);

          info = new Highcharts.Chart({
            chart: {
              renderTo: 'load',
              margin: [0, 0, 0, 0],
              backgroundColor: null,
                      plotBackgroundColor: 'none',

            },

            title: {
              text: null
            },

            tooltip: {
              formatter: function() {
                return this.point.name +': '+ this.y +' %';

              }
            },
              series: [
              {
              borderWidth: 2,
              borderColor: '#F1F3EB',
              shadow: false,
              type: 'pie',
              name: 'Income',
              innerSize: '65%',
              data: [
                { name: 'user cancel', y: userLogCancel, color: '#3d3d3d' },
                { name: 'user request', y: userLogReg, color: '#b2c831' }
              ],
              dataLabels: {
                enabled: false,
                color: '#000000',
                connectorColor: '#000000'
              }
            }]
          });
      });

      //action log driver
      var driverLog,  driverLogFin, driverLogCancel;
      $.get(domain+'/driverLog'+things2).success(function(data){
          // alert(data.message.length);
          driverLog = Number(data.message.length);
          $('.driverlogtot').text(driverLog);
      });
      $.get(domain+'/driverLogFin'+things2).success(function(data){
          // alert(data.message.length);
          driverLogFin = Number(data.message.length);
          driverLogCancel = driverLog - driverLogFin;

          var request = driverLogFin/driverLog*100;
          var cancel = driverLogCancel/driverLog*100;
          // alert(driverLogFin);

          $('.driverfin').text(request.toFixed(1));
          $('.drivercancel').text(cancel.toFixed(1));

          info = new Highcharts.Chart({
            chart: {
              renderTo: 'space',
              margin: [0, 0, 0, 0],
              backgroundColor: null,
                      plotBackgroundColor: 'none',

            },

            title: {
              text: null
            },

            tooltip: {
              formatter: function() {
                return this.point.name +': '+ this.y +' %';

              }
            },
              series: [
              {
              borderWidth: 2,
              borderColor: '#F1F3EB',
              shadow: false,
              type: 'pie',
              name: 'SiteInfo',
              innerSize: '65%',
              data: [
                { name: 'driver cancel', y: driverLogCancel, color: '#3d3d3d' },
                { name: 'driver finish', y: driverLogFin, color: '#fa1d2d' }
              ],
              dataLabels: {
                enabled: false,
                color: '#000000',
                connectorColor: '#000000'
              }
            }]
          });

      });
    }
]);
