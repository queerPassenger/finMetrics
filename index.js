const fs=require('fs');
let selectedCompany='altimetrik';
let payslipOperation=require('./organization/'+selectedCompany+'.js');
let selectedBank='icici';
let bankOperation=require('./bank/'+selectedBank+'.js');

const execute=(finYear,type,cb)=>{
    if(type==='bankstatement'){
      bankOperation.fileReader(finYear,(obj)=>{
        cb(obj);
      })
    }
    else if(type==='payslip'){
      payslipOperation.fileReader(finYear,(obj)=>{
        cb(obj);
      });
    }
};

module.exports={execute};

