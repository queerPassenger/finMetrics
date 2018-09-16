
let pdfreader = require('pdfreader');
let fs = require('fs');
let fileList=['May-2018.PDF','June-2018.PDF','July-2018.PDF','August-2018.PDF'];
let inputFilePath='./src/';
let outputFilePath='./des/';
let inputFileExt='.pdf';
let outputFileExt='.txt';
let maxPageCount=2;

let _finSet=[];
let i=0;
function fileReader(cb){
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
                    fileReader(cb);
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

module.exports={
    fileReader
};
