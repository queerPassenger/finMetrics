
let pdfreader = require('pdfreader');
let boilerPlate=require('../boilerplate.js');
let fs = require('fs');
let fileList=['May-2018.PDF','June-2018.PDF','July-2018.PDF','August-2018.PDF'];
let inputFilePath='./src/';
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
                        alreadyUsedInd.push(matchedInd+1);
                        currentObj.val=rawDataObj[matchedInd+1].trim();
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
                        }
                    }
                }
            }
        }
        analysedData.push(newObj);
    }
    return analysedData;
}
const fileReader=()=>{
    rawData((_object)=>{        
        let obj=analyseData(_object);
        fs.writeFile("./des/analysedData.json",JSON.stringify(obj),(err)=>{
            if(!err){
                console.log('DONE');
            }
        })
    });
}


module.exports={
    fileReader
};
