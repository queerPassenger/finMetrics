const pdfreader=require('pdfreader');
const fs=require('fs');
const monthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function analyseData(_data){
    let expenditure=[['S.No','Value Date','Transaction Date','Transaction Remarks','Withdrawal']];
    let income=[['S.No','Value Date','Transaction Date','Transaction Remarks','Deposit']];
    let monthlyExpenses=[];
    let monthlyIncome=[];
    [...Array(12)].map(obj=>{
        monthlyExpenses.push(0);
        monthlyIncome.push(0);
    })
    let _currMonthExp=0;
    let _currMonthInc=0;
    for(let i=1;i<_data.length;i++){

        if(Number(_data[i][6])===0){            
            let newData=[..._data[i]];
            newData.splice(6,2);
            newData.splice(3,1);      
            newData.splice(0,1,expenditure.length);
            expenditure.push(newData);
        }
        if(Number(_data[i][5])===0){
            let newData=[..._data[i]];
            newData.splice(7,1);
            newData.splice(5,1);
            newData.splice(3,1);         
            newData.splice(0,1,income.length);
            income.push(newData);
        }
        if(Number(_data[i][2].split('/')[1])-1!==_currMonthExp){
            _currMonthExp=Number(_data[i][2].split('/')[1])-1;
            monthlyExpenses[_currMonthExp]+=Number(_data[i][5]);
        }
        else{
            monthlyExpenses[_currMonthExp]+=Number(_data[i][5]);
        }
        if(Number(_data[i][2].split('/')[1])-1!==_currMonthInc){
            _currMonthInc=Number(_data[i][2].split('/')[1])-1;
            monthlyIncome[_currMonthInc]+=Number(_data[i][6]);
        }
        else{
            monthlyIncome[_currMonthInc]+=Number(_data[i][6]);
        }

    }
    let monthlyExpInc=[['','Income','Expense','Savings']];
    [...Array(12)].map((obj,ind)=>{
        let newArr=[];
        newArr.push(monthArr[ind]);
        newArr.push(monthlyIncome[ind]);
        newArr.push(monthlyExpenses[ind]);  
        newArr.push(monthlyIncome[ind]-monthlyExpenses[ind]);  
        monthlyExpInc.push(newArr);
    })
    let temp=monthlyExpInc.splice(1,3);
    temp.map(x=>monthlyExpInc.push(x));
    return {
        data:_data,
        expenditure,
        income,
        monthlyExpInc
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
