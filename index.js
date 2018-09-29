const fs=require('fs');
let companyList=['altimetrik'];
let selectedCompany='altimetrik';
let output= require('./organization/'+selectedCompany+'.js');

output.fileReader();

