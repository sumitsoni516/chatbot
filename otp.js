function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
  
  const otp=between(100000, 1000000)
  console.log( otp )
  
  var count=0;
  var nodemailer = require('nodemailer');
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sumitsn590@gmail.com',
    pass: '7049656600'
  }
});

var mailOptions = {
  from: 'sumitsn590@gmail.com',
  to: 'sumitsoni516@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'your otp is ' + otp
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    //console.log('Email sent: ' + info.response);
  }
});
function a(){
readline.question('enter otp : ', otpp => {
    if(otpp==otp){
        return console.log(    'OTP is successfully confermed'    );
    }
    else{
        count +=1;
        console.log(    'otp is wrong for '+ count +' times.');
        
        if(count>2){
            readline.close();
            return console.log('you have extend the max limit ');
        }else{
            a()
        }
    }
    
  });
}
a()