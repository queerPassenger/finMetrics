
let pdfreader = require('pdfreader');
let boilerPlate=require('../boilerplate.js');
let fs = require('fs');
const path = require("path");
let monthArray=['April','May','June','July','August','September','October','November','December','January','February','March'];
let fileList=[];
let inputFilePath='';
let outputFilePath='./des/';
let inputFileExt='.pdf';
let outputFileExt='.txt';
let maxPageCount=2;

let _finSet=[];
let i=0;
function rawData(cb){
    let docSet=[];
    let _finObj={
        file:fileList[i],
        data:[],
    };
    let count=1;  

    new pdfreader.PdfReader().parseFileItems(inputFilePath+fileList[i]+inputFileExt,(err, item)=>{      
        if (!item || item.page){        
            if(count===maxPageCount){
                count=1;
                i++;
                _finSet.push(_finObj);
                if(i<fileList.length){                    
                    rawData(cb);
                }
                else{
                    cb(_finSet);
                }
            }
            else{
                count++;
            }    
        } 
        else if (item && item.text){
            _finObj.data.push(item.text);
        }
        
    });

}
const analyseData=(_object)=>{
    let analysedData=[];
    for(let i=0;i<_object.length;i++){
        let rawDataObj=_object[i].data;
        let newObj={
            id:'',
            data:boilerPlate.getObj('paySlipData'),
        };
        let alreadyUsedInd=[];
        let dataKeys=Object.keys(newObj.data);
        for(let k=0;k<dataKeys.length;k++){
            let subDataKeys=Object.keys(newObj.data[dataKeys[k]]);
            for(let l=0;l<subDataKeys.length;l++){
                let currentObj=newObj.data[dataKeys[k]][subDataKeys[l]];
                let nextObj=subDataKeys[l+1]?newObj.data[dataKeys[k]][subDataKeys[l+1]]:{access:['nothing']};
                if(currentObj.type==='index_curr'){
                    let temp='';
                    currentObj.access.map((indObj,ind)=>{
                        alreadyUsedInd.push(indObj);
                        currentObj.val+=rawDataObj[indObj]+' ';
                    })
                    currentObj.val.trim();
                }
                else if(currentObj.type==='index_next'){
                    let matchedInd=rawDataObj.indexOf(currentObj.access[0]);
                   
                    if(matchedInd!==-1){
                        alreadyUsedInd.push(matchedInd);
                        
                        if(rawDataObj[matchedInd+1].trim()===nextObj.access[0].trim()){
                            currentObj.val="0";
                        }
                        else{
                            currentObj.val=rawDataObj[matchedInd+1].trim();
                            alreadyUsedInd.push(matchedInd+1);
                        }
                        
                    }   
                }
                else if(currentObj.type==='split'){
                    for(let j=0;j<rawDataObj.length;j++){
                        if(alreadyUsedInd.indexOf(j)!==-1){
                            continue;
                        }
                        if(rawDataObj[j].indexOf(currentObj.access[0])!==-1){
                            currentObj.val=rawDataObj[j].split(currentObj.access[1])[1].replace('- ',' - ').trim();
                            alreadyUsedInd.push(j);
                            break;
                        }
                    }                    
                }                
                else if(currentObj.type==='complex'){
                    let matchedInd=-1;
                    rawDataObj.map((a,aInd) =>{if((a+rawDataObj[aInd+1]).indexOf(currentObj.access[0])!==-1){matchedInd=aInd}});
                    if(matchedInd==-1){
                        currentObj.val="0";
                    }
                    else{
                        let combinedStr=rawDataObj[matchedInd]+''+rawDataObj[matchedInd+1];
                        currentObj.val=combinedStr.split(currentObj.access[0])[1].trim().split(' ')[0];
                    }
                    
                }

                if(currentObj.numConvert){
                    currentObj.val=Number(currentObj.val.replace(',',''));
                }
                
            }
        }
        analysedData.push(newObj);
    }
    return analysedData;
}
const fileReader=(finYear,cb)=>{
    i=0;
    _finSet=[];
    fileList=[];
    inputFilePath=path.join(__dirname,'/../','repo/payslips/');
    inputFilePath+='fin'+finYear+'\\';
    let _year1=finYear.split('-')[0];
    let _year2=finYear.split('-')[1];
    


    for(let k=0;k<monthArray.length;k++){
        let fileName=monthArray[k]+'-'+(k>=9?_year2:_year1);
        if (!(fs.existsSync(inputFilePath+fileName+inputFileExt))){
            // Do something
            console.log('File Not Found ', inputFilePath+fileName+inputFileExt);  
        }
        else{      
            fileList.push(fileName);
        }        
    }

    rawData((_object)=>{        
        let obj=analyseData(_object);
        /* fs.writeFile("./des/analysedData.json",JSON.stringify(_object),(err)=>{
            if(!err){
                console.log('DONE');
                
            }
        }) */
        cb(obj);
       
        
    });
}


module.exports={
    fileReader
};
