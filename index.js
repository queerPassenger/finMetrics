const fs=require('fs');
const opn = require('opn');
let companyList=['altimetrik'];
let selectedCompany='altimetrik';
let output= require('./organization/'+selectedCompany+'.js');




output.fileReader((obj)=>{
    opn('index.html');
});


// opens the url in the default browser 


// specify the app to open in 
/* opn('http://sindresorhus.com', {app: 'firefox'}); */

