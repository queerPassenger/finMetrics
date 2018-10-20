const pdfreader=require('pdfreader');
const fs=require('fs');

function analyseData(_data){
    let expenditure=[['S.No','Value Date','Transaction Date','Transaction Remarks','Withdrawal']];
    let income=[['S.No','Value Date','Transaction Date','Transaction Remarks','Deposit']];
    for(let i=1;i<_data.length;i++){
        if(Number(_data[i][6])===0){
            let newData=[..._data[i]];
            newData.splice(6,2);
            newData.splice(3,1);      
            newData.splice(1,1,expenditure.length);
            expenditure.push(newData);
        }
        if(Number(_data[i][5])===0){
            let newData=[..._data[i]];
            newData.splice(7,1);
            newData.splice(5,1);
            newData.splice(3,1);         
            newData.splice(1,1,income.length);
            income.push(newData);
        }
    }
    let obj
    return {
        data:_data,
        expenditure,
        income
    }
}
function fileReader(finYear,cb){
    let startFlag=false;
    let arr=[];
    arr.push(['S.No','Value Date','Transaction Date','Cheque Number','Transaction Remarks','Withdrawal(INR)','Deposit(INR)','Balance(INR)']);

    let subArr=[];
    let remarksStr='';
    let inputFilePath='C:/src/bankstatements/';
    inputFilePath+='fin'+finYear+'/';
    let fileName='fin'+finYear;
    if (!(fs.existsSync(inputFilePath+fileName+'.pdf'))){
        // Do something
        console.log('File Not Found ',inputFilePath+fileName+'.pdf');  
    }
    new pdfreader.PdfReader().parseFileItems(inputFilePath+fileName+'.pdf',(err,item)=>{
        if(item && item.text){
            if(item.text.includes('Legends Used in Account Statement')){
                if(subArr.length===8){
                    arr.push(subArr);
                }
                cb(analyseData(arr));               
            }
            else{
                if(startFlag){
                    if(subArr.length<=3){
                        subArr.push(item.text);
                    }
                    else if(subArr.length===4){
                        if(item.text.includes('.')){
                            if((!isNaN(item.text.split('.')[0])) && (!isNaN(item.text.split('.')[1]))){
                                subArr.push(remarksStr);
                                subArr.push(item.text);
                            }
                            else{
                                remarksStr+=item.text;
                            }
                        }
                        else{
                            remarksStr+=item.text;
                        }
                    }
                    else if(subArr.length<8){
                        subArr.push(item.text);
                    }
                    else{
                        arr.push(subArr);
                        subArr=[];
                        subArr.push(item.text);
                        remarksStr='';
                    }
                }
                if(item.text==='Balance (INR )'){
                    startFlag=true;
                }
            }
        }
    })
}



module.exports={
    fileReader
};
