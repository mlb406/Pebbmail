/* localStorage
 * 1,2 "gmail""
 * 11-15 "to"
 * 21-23 "subject"
 * 31-35 "body"
 * 41+ menu selections
 */

var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');
var Settings = require('settings');
var main = new UI.Card({
  title: 'Mail for Pebble',
  body: 'Press select to begin!',
});

main.show();

Settings.config(
  {url:'https://mlb406.github.io/Pebbmail'},
  function(e) {
    console.log('Settings opened!');
    main.body('Settings opened!');
  },
  function(e) {
    console.log("Settings closed!");
    var options = e.options;
    console.log(JSON.stringify(options));
    var gmailAddr = options.gmail.address;
   
    
    var gmailPass = options.gmail.password;
    
    
    var to1 = options.to.to_1;
    
    var to2 = options.to.to_2;
    
    var to3 = options.to.to_3;
    
    var to4 = options.to.to_4;
    
    var to5 = options.to.to_5;
    
    var sub1 = options.subject.sub_1;
    
    var sub2 = options.subject.sub_2;
    
    var sub3 = options.subject.sub_3;
    
    var body1 = options.body.body_1;
    
    var body2 = options.body.body_2;
    
    var body3 = options.body.body_3;
    
    var body4 = options.body.body_4;
    
    var body5 = options.body.body_5;
    
    
    localStorage.setItem(1, gmailAddr);
    localStorage.setItem(2, gmailPass);
    
    localStorage.setItem(11, to1);
    localStorage.setItem(12, to2);
    localStorage.setItem(13, to3);
    localStorage.setItem(14, to4);
    localStorage.setItem(15, to5);
    
    localStorage.setItem(21, sub1);
    localStorage.setItem(22, sub2);
    localStorage.setItem(23, sub3);
    
    localStorage.setItem(31, body1);
    localStorage.setItem(32, body2);
    localStorage.setItem(33, body3);
    localStorage.setItem(34, body4);
    localStorage.setItem(35, body5);
    Vibe.vibrate('double');
    main.body('Settings recieved!');
    setTimeout(function() {
      main.body('Press select to begin!');
    },3000);
  }
);

main.on('click', 'select', function(e) {
  var user = localStorage.getItem(1);
  var pass = localStorage.getItem(2);
  var to1 = localStorage.getItem(11);
  var to2 = localStorage.getItem(12);
  var to3 = localStorage.getItem(13);
  var to4 = localStorage.getItem(14);
  var to5 = localStorage.getItem(15);
  var subject1 = localStorage.getItem(21);
  var subject2 = localStorage.getItem(22);
  var subject3 = localStorage.getItem(23);
  var body1 = localStorage.getItem(31);
  var body2 = localStorage.getItem(32);
  var body3 = localStorage.getItem(33);
  var body4 = localStorage.getItem(34);
  var body5 = localStorage.getItem(35);
  
  var emailMenu = new UI.Menu({
    sections: [{
      title: 'Select email to',
      items: [{
        title: to1
      }, {
        title: to2
      }, {
        title: to3
      }, {
        title: to4
      }, {
        title: to5
      }]
    }]
  });
  emailMenu.show();
  emailMenu.on('select', function(to){
    localStorage.setItem(41, to.item.title);
    var subjectMenu = new UI.Menu({
      sections: [{
        title: 'Select subject',
        items: [{
          title: subject1
        }, {
          title: subject2
        }, {
          title: subject3
        }]
      }]
    });
    subjectMenu.show();
    subjectMenu.on('select', function(subject) {
      localStorage.setItem(42, subject.item.title);
      var bodyMenu = new UI.Menu({
        sections: [{
          title: 'Select body',
          items: [{
            title: body1,
          }, {
            title: body2,
          }, {
            title: body3
          }, {
            title: body4
          }, {
            title: body5
          }]
        }]
      });
      bodyMenu.show();
      bodyMenu.on('select', function(body) {
        localStorage.setItem(43, body.item.title);
        
      
    
  
        var emailTo = localStorage.getItem(41);
        var emailSubject = localStorage.getItem(42);
        var emailBody = localStorage.getItem(43);
  
        var confirmCard = new UI.Card({
          title: 'Confirm email?',
          body: emailTo + '\n' + emailSubject + '\n' + emailBody,
          scrollable: true,
          action: {
            select: 'images/right_arrow.png'
          }
        });
        confirmCard.show();
        confirmCard.on('click', 'select', function(e) {
          var sentCard = new UI.Card({
            title: 'Sending...',
            body: 'Sending email'
          });
          sentCard.show();
          var url = 'http://mlb406.byethost7.com/email.php?to=' + encodeURIComponent(emailTo) + '&subject=' + encodeURIComponent(emailSubject) + '&body=' + encodeURIComponent(emailBody) + '&user=' + encodeURIComponent(user) + '&pass=' + encodeURIComponent(pass);
  
          ajax(
          {
            url: url,
            type: 'json'
          },
            function(data) {
              console.log(data.success);
              console.log(data);
              console.log(JSON.stringify(data));
              if (data.success == "true") {
                console.log('success');
                sentCard.title('Success');
                sentCard.body('Email sent!');
                Vibe.vibrate('double');
              } else {
                console.log('error');
                sentCard.title('Error');
                sentCard.body('An error occured. Please try again later or check entered parameters');
                Vibe.vibrate('long');
              }
              
              
              
            },
            function(error) {
              console.log('error: ' + error);
              sentCard.title('Error');
              sentCard.body('An error occured:\n' + error);
            }
  
          );
        });
      });
    });
  });
});
