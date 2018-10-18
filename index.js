const fs=require('fs');
const opn = require('opn');
let companyList=['altimetrik'];
let selectedCompany='altimetrik';
let output= require('./organization/'+selectedCompany+'.js');


const execute=(finYear,cb)=>{
    output.fileReader(finYear,(obj)=>{
       cb(obj);
     });
};

module.exports={execute};



// opens the url in the default browser 


// specify the app to open in 
/* opn('http://sindresorhus.com', {app: 'firefox'}); */

