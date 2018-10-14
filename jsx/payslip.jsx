import React from 'react';

export default class Payslip extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _:''
        };
        this.expandClick="";
        this._data=[];
        this._dataParser=['payPeriod','earnings','deductions']
        this.analyseFlag=false;
    }
    handleAnalyse(){
        let xhttp = new XMLHttpRequest();
        let _this=this;
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                
                _this._data=_this.getGridData(JSON.parse(xhttp.responseText));
                console.log('_data',_this._data);
                _this.analyseFlag=true;
                _this.setState({
                    _:''
                });
            }
        };
        xhttp.open("GET", "/analyse", true);
        xhttp.send();
    }
    getGridData(_data){
        console.log('_data insideGetGRidData',typeof _data);
        let gridData=[];
        let firstRow={type:'',data:['Headers']};
        let earnings={type:'',data:['Earnings'],expand:true};
        let basic={type:'Earnings',data:['Basic Pay']};
        let hra={type:'Earnings',data:['House Rent Allowance']};
        let fbp={type:'Earnings',data:['Flexible Benefit Plan']};
        let conveyance={type:'Earnings',data:['Conveyance Allowance']};
        let lta={type:'Earnings',data:['Leave Travel Allowance']};
        let deductions={type:'',data:['Deductions'],expand:true};
        let pf={type:'Deductions',data:['Provident Fund']}
        let pt={type:'Deductions',data:['Provisional Tax']}
        let it={type:'Deductions',data:['Income Tax']}
        let medInsPrem={type:'Deductions',data:['Medical Insurance Premium']};
        let netTotal={type:'',data:['Net Pay']};

        _data.map(dataObj=>{
            console.log("data inside map",dataObj);
            let earningsSum=0;
            let deductionsSum=0;
            firstRow.data.push(dataObj.data.employee.payPeriod.val);
            
            basic.data.push(dataObj.data.earnings.basic.val);
            hra.data.push(dataObj.data.earnings.hra.val);
            fbp.data.push(dataObj.data.earnings.fbp.val);
            lta.data.push(dataObj.data.earnings.lta.val);
            conveyance.data.push(dataObj.data.earnings.conveyance.val||0);
            earningsSum=dataObj.data.earnings.basic.val+dataObj.data.earnings.hra.val+dataObj.data.earnings.fbp.val+dataObj.data.earnings.lta.val+(dataObj.data.earnings.conveyance.val||0);
            earnings.data.push(earningsSum)

            pf.data.push(dataObj.data.deductions.pf.val);
            pt.data.push(dataObj.data.deductions.pt.val);
            it.data.push(dataObj.data.deductions.it.val);
            medInsPrem.data.push(dataObj.data.deductions.medInsPrem.val);
            deductionsSum=dataObj.data.deductions.pf.val+dataObj.data.deductions.pt.val+dataObj.data.deductions.it.val+dataObj.data.deductions.medInsPrem.val;
            deductions.data.push(deductionsSum);
            
            netTotal.data.push(earningsSum-deductionsSum);
            
        });
        gridData.push(firstRow);
        gridData.push(earnings);
        gridData.push(basic);
        gridData.push(hra);
        gridData.push(fbp);
        gridData.push(lta);
        gridData.push(conveyance);
        gridData.push(deductions);
        gridData.push(pf);
        gridData.push(pt);
        gridData.push(it);
        gridData.push(medInsPrem);
        gridData.push(netTotal);
        return gridData;

        
    }
    handleExp(_obj,_key,dataName){
        _obj[_key]=!_obj[_key];
        this.expandClick=dataName;
        this.setState({
            _:'',
        })
    }
    componentDidUpdate(){
        if(this.expandClick){
            console.log('NEW',document.getElementsByClassName(this.expandClick));
            var testarray = document.getElementsByClassName(this.expandClick);
            for(var i = 0; i < testarray.length; i++)
            {
                if(testarray[i].className.indexOf('hide')!==-1){
                    testarray[i].className=testarray[i].className.replace('hide','');
                }
                else{
                    testarray[i].className += " hide";
                }
            }
            this.expandClick='';
        }
    }
    
    render(){
        console.log('this._data',this._data);
        return(
            <div className="payslip-wrapper">
                <div className="payslip-header-label">
                    Payslip
                </div>     
                {this.analyseFlag?
                    <div className="grid-super-wrapper">
                        <div className="grid-wrapper" >
                            {this._data.map((data,ind)=>{
                                return(
                                    <div className={("row ")+data.type}>
                                        {data.data.map((subData,subInd)=>{                                        
                                            return(
                                                <div className={(ind===0 || subInd===0?ind==0?"cell vheader":"cell rheader":"cell")+(data.type===''?" bold":"")} >
                                                    <span className={("label")+(data.type!=='' && subInd===0?" subH":" ")}>
                                                        {subData}
                                                    </span>
                                                    {data.hasOwnProperty('expand') && subInd===0?
                                                        <span className="expand" onClick={this.handleExp.bind(this,data,'expand',subData)}>
                                                            {data.expand?"-":"+"}
                                                        </span>
                                                    :
                                                        null
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                :
                    <div className="payslip-analyse-button">
                        <button onClick={this.handleAnalyse.bind(this)}>Analyse</button>
                    </div>
                }

            </div>
        )
    }
}