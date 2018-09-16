const fs=require('fs');
let companyList=['altimetrik'];
let selectedCompany='altimetrik';
let finAnalyser= require('./organization/'+selectedCompany+'.js');

finAnalyser.fileReader((_object)=>{
    fs.writeFile("./des/pdfRawData.json",JSON.stringify(_object),(err)=>{
        if(!err){
            console.log('DONE');
        }
    })
})

