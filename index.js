const fs=require('fs');
let companyList=['altimetrik'];
let selectedCompany='altimetrik';
let output= require('./organization/'+selectedCompany+'.js');

output.fileReader((_object)=>{
    fs.writeFile("./des/pdfRawData.json",JSON.stringify(_object),(err)=>{
        if(!err){
            console.log('DONE');
        }
    })
})

