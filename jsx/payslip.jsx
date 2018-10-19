import React from 'react';

export default class Payslip extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _:''
        };
        this.expandClick="";
        this._data=[];
        this.finYears=['2017-2018','2018-2019'];
        this.finYearSel=0;
        this._dataParser=['payPeriod','earnings','deductions']
        this.analyseFlag=false;
        this.loading=false;
    }
    componentWillMount(){
        this.handleAnalyse();
    }
    handleAnalyse(){
        let xhttp = new XMLHttpRequest();
        let _this=this;
        this.loading=true;
        this.setState({
            _:''
        });
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {                
                _this._data=_this.getGridData(JSON.parse(xhttp.responseText));
                console.log('_data',_this._data);
                _this.analyseFlag=true;
                _this.loading=false;
                _this.setState({
                    _:''
                });
            }
        };
        xhttp.open("GET", "/payslip/analyse?finYear="+this.finYears[this.finYearSel], true);
        xhttp.send();
    }
    getGridData(_data){
        console.log('_data insideGetGRidData',typeof _data);
        this.expandClick="";
        let gridData=[];
        let firstRow={type:'',data:['Salary Components / Pay Period']};
        let earnings={type:'',data:['Earnings'],expand:true};
        let basic={type:'Earnings',data:['Basic Pay']};
        let hra={type:'Earnings',data:['House Rent Allowance']};
        let fbp={type:'Earnings',data:['Flexible Benefit Plan']};
        let conveyance={type:'Earnings',data:['Conveyance Allowance']};
        let lta={type:'Earnings',data:['Leave Travel Allowance']};
        let deductions={type:'',data:['Deductions'],expand:true};
        let pf={type:'Deductions',data:['Provident Fund']};
        let pt={type:'Deductions',data:['Professional Tax']};
        let it={type:'Deductions',data:['Income Tax']};
        let medInsPrem={type:'Deductions',data:['Medical Insurance Premium']};

        let others={type:'',data:['Others'],expand:true};
        let fc={type:'Others',data:['Food Coupons']};
        let fcArrears={type:'Others',data:['Food Coupons arrear']};
        let medicalReimbursement={type:'Others',data:['Medical Reimbursements']};
        let medicalArrears={type:'Others',data:['Medical Arrears']};
        let fuelAllowance={type:'Others',data:['Fuel Allowance']};
        let fuelArrears={type:'Others',data:['Fuel Arrears']};
        let carLeaseRental={type:'Others',data:['Car Lease Rental']};
        let carLeaseArrears={type:'Others',data:['Car Lease Arrears']};
        let nps={type:'Others',data:['Contribution to NPS']};
        let giftAwards={type:'Others',data:['Gifts and Awards']};

        let netTotal={type:'',data:['** Net Pay(Earnings-Deductions)']};
        let total={type:'',data:['** Total(Earnings-Deductions+Others)']};

        _data.map(dataObj=>{
            console.log("data inside map",dataObj);
            let earningsSum=0;
            let deductionsSum=0;
            let othersSum=0;

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
            
            fc.data.push(dataObj.data.others.fc.val);
            fcArrears.data.push(dataObj.data.others.fcArrears.val);
            medicalReimbursement.data.push(dataObj.data.others.medicalReimbursement.val);
            medicalArrears.data.push(dataObj.data.others.medicalArrears.val);
            fuelAllowance.data.push(dataObj.data.others.fuelAllowance.val);
            fuelArrears.data.push(dataObj.data.others.fuelArrears.val);
            carLeaseRental.data.push(dataObj.data.others.carLeaseRental.val);
            carLeaseArrears.data.push(dataObj.data.others.carLeaseArrears.val);
            nps.data.push(dataObj.data.others.nps.val);
            giftAwards.data.push(dataObj.data.others.giftAwards.val);
            othersSum=(dataObj.data.others.fc.val+dataObj.data.others.fcArrears.val+dataObj.data.others.medicalReimbursement.val+dataObj.data.others.medicalArrears.val+dataObj.data.others.fuelAllowance.val+dataObj.data.others.fuelArrears.val+dataObj.data.others.carLeaseRental.val+dataObj.data.others.carLeaseArrears.val+dataObj.data.others.nps.val+dataObj.data.others.giftAwards.val);
            others.data.push(othersSum);

            netTotal.data.push(earningsSum-deductionsSum);
            total.data.push(earningsSum-deductionsSum+othersSum)
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
        gridData.push(others);
        gridData.push(fc);
        gridData.push(fcArrears);
        gridData.push(medicalReimbursement);
        gridData.push(medicalArrears);
        gridData.push(fuelAllowance);
        gridData.push(fuelArrears);
        gridData.push(carLeaseRental);
        gridData.push(carLeaseArrears);
        gridData.push(nps);
        gridData.push(giftAwards);
        gridData.push(netTotal);
        gridData.push(total);

        return gridData;

        
    }
    handleExp(_obj,_key,dataName){
        _obj[_key]=!_obj[_key];
        this.expandClick=dataName;
        this.setState({
            _:'',
        })
    }
    handleFinYearSel(ind){
        this.finYearSel=ind;
        this.handleAnalyse();
        this.setState({
            _:''
        });
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
                <div className="left-panel-wrapper">
                    <div className="left-panel-header">Financial Years</div>
                    <div className="leftPanel-list-items">
                        {this.finYears.map((year,yearInd)=>{
                            return(
                                <button className={yearInd===this.finYearSel?"leftPanel-list-active":"leftPanel-list"} onClick={this.handleFinYearSel.bind(this,yearInd)}>{year}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="right-panel-wrapper">
                        {(this.loading)?
                            <div className="loading-wrapper">
                                Loading...
                            </div>
                        :
                            <div className="grid-super-wrapper">
                                <div className="grid-wrapper" >
                                    {this._data.map((data,ind)=>{
                                        return(
                                            <div className={("row ")+data.type}>
                                                {data.data.map((subData,subInd)=>{                                        
                                                    return(
                                                        <div className={(ind===0 || subInd===0?ind==0?"cell vheader":"cell rheader":"cell")+(data.type===''?" bold":"")} >
                                                            <span className={("label")+(data.type!=='' && subInd===0?" subH":" ")}>
                                                                {subData?subData:0}
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
                        }                 
                </div>
                

            </div>
        )
    }
}