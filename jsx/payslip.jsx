import React from 'react';
var HighCharts=require('highcharts');

export default class Payslip extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _:''
        };
        this.monthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        this.expandClick="";
        this.cumexpandClick="";
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
                
                let customizedData=_this.customizeData(JSON.parse(xhttp.responseText));
                _this._data=customizedData.gridData;

                console.log('_data',_this._data);
                
                _this.analyseFlag=true;
                _this.loading=false;
                _this.setState({
                    _:''
                },()=>{
                    _this.buildCharts(customizedData.chartData);
                });
            }
        };
        xhttp.open("GET", "/payslip/analyse?finYear="+this.finYears[this.finYearSel], true);
        xhttp.send();
    }
    customizeData(_data){
        this.expandClick="";
        this.cumexpandClick="";
        let gridData=[];
        let firstRow={type:'',cumtype:'',data:['Salary Components / Pay Period'],cumulativeData:['Cumulative Salary / Pay Period',_data.length+' months']};
        let earnings={type:'',cumtype:'',data:['Earnings'],expand:false,cumulativeData:['Earnings',0],cumexpand:false};
        let basic={type:'Earnings',cumtype:'cumEarnings',data:['Basic Pay'],cumulativeData:['Basic Pay',0],};
        let hra={type:'Earnings',cumtype:'cumEarnings',data:['House Rent Allowance'],cumulativeData:['House Rent Allowance',0],};
        let fbp={type:'Earnings',cumtype:'cumEarnings',data:['Flexible Benefit Plan'],cumulativeData:['Flexible Benefit Plan',0],};
        let conveyance={type:'Earnings',cumtype:'cumEarnings',data:['Conveyance Allowance'],cumulativeData:['Conveyance Allowance',0],};
        let lta={type:'Earnings',cumtype:'cumEarnings',data:['Leave Travel Allowance'],cumulativeData:['Leave Travel Allowance',0],};
        let deductions={type:'',cumtype:'',data:['Deductions'],expand:false,cumulativeData:['Deductions',0],cumexpand:false};
        let pf={type:'Deductions',cumtype:'cumDeductions',data:['Provident Fund'],cumulativeData:['Provident Fund',0],};
        let pt={type:'Deductions',cumtype:'cumDeductions',data:['Professional Tax'],cumulativeData:['Professional Tax',0],};
        let it={type:'Deductions',cumtype:'cumDeductions',data:['Income Tax'],cumulativeData:['Income Tax',0],};
        let medInsPrem={type:'Deductions',cumtype:'cumDeductions',data:['Medical Insurance Premium'],cumulativeData:['Medical Insurance Premium',0],};

        let others={type:'',cumtype:'',data:['Others'],expand:false,cumulativeData:['Others',0],cumexpand:false};
        let fc={type:'Others',cumtype:'cumOthers',data:['Food Coupons'],cumulativeData:['Food Coupons',0]};
        let fcArrears={type:'Others',cumtype:'cumOthers',data:['Food Coupons arrear'],cumulativeData:['Food Coupons arrear',0]};
        let medicalReimbursement={type:'Others',cumtype:'cumOthers',data:['Medical Reimbursements'],cumulativeData:['Medical Reimbursements',0]};
        let medicalArrears={type:'Others',cumtype:'cumOthers',data:['Medical Arrears'],cumulativeData:['Medical Arrears',0]};
        let fuelAllowance={type:'Others',cumtype:'cumOthers',data:['Fuel Allowance'],cumulativeData:['Fuel Allowance',0]};
        let fuelArrears={type:'Others',cumtype:'cumOthers',data:['Fuel Arrears'],cumulativeData:['Fuel Arrears',0]};
        let carLeaseRental={type:'Others',cumtype:'cumOthers',data:['Car Lease Rental'],cumulativeData:['Car Lease Rental',0]};
        let carLeaseArrears={type:'Others',cumtype:'cumOthers',data:['Car Lease Arrears'],cumulativeData:['Car Lease Arrears',0]};
        let nps={type:'Others',cumtype:'cumOthers',data:['Contribution to NPS'],cumulativeData:['Contribution to NPS',0]};
        let giftAwards={type:'Others',cumtype:'cumOthers',data:['Gifts and Awards'],cumulativeData:['Gifts and Awards',0]};

        let netTotal={type:'',cumtype:'',data:['** Net Pay(Earnings-Deductions)'],cumulativeData:['** Net Pay(Earnings-Deductions)',0]};
        let total={type:'',cumtype:'',data:['** Total(Earnings-Deductions+Others)'],cumulativeData:['** Total(Earnings-Deductions+Others)',0]};
        

        let chartData={
            xAxis:[],
            earnings:[
                {
                    name:'Basic Pay',
                    data:[],
                },
                {
                    name:'House Rent Allowance',
                    data:[],
                },
                {
                    name:'Flexible Benefit Plan',
                    data:[],
                },
                {
                    name:'Conveyance Allowance',
                    data:[],
                },
                {
                    name:'Leave Travel Allowance',
                    data:[],
                },
                {
                    name:'Total Earnings',
                    data:[],
                }
            ],
            deductions:[
                {
                    name:'Provident Fund',
                    data:[],
                },
                {
                    name:'Professional Tax',
                    data:[],
                },
                {
                    name:'Income Tax',
                    data:[],
                },
                {
                    name:'Medical Insurance Premium',
                    data:[],
                },
                {
                    name:'Total Deductions',
                    data:[],
                },
               
            ],
            others:[
                {
                    name:'Food Coupons',
                    data:[],
                },
                {
                    name:'Food Coupons arrear',
                    data:[],
                },
                {
                    name:'Medical Reimbursements',
                    data:[],
                },
                {
                    name:'Medical Arrears',
                    data:[],
                },
                {
                    name:'Fuel Allowance',
                    data:[],
                },
                {
                    name:'Fuel Arrears',
                    data:[],
                },
                {
                    name:'Car Lease Rental',
                    data:[],
                },
                {
                    name:'Car Lease Arrears',
                    data:[],
                },
                {
                    name:'Contribution to NPS',
                    data:[],
                },
                {
                    name:'Gifts and Awards',
                    data:[],
                },
                {
                    name:'Total Others',
                    data:[],
                },
            ],
        }



        _data.map(dataObj=>{
            console.log("data inside map",dataObj);
            let earningsSum=0;
            let deductionsSum=0;
            let othersSum=0;
            /*Earnings*/
            firstRow.data.push(dataObj.data.employee.payPeriod.val);
            let temp=dataObj.data.employee.payPeriod.val.split('-')[1].split('.');

            chartData.xAxis.push(this.monthArr[temp[1]-1]+temp[2]);

            basic.data.push(dataObj.data.earnings.basic.val);
            basic.cumulativeData[1]+=dataObj.data.earnings.basic.val;
            chartData.earnings[0].data.push(dataObj.data.earnings.basic.val);

            hra.data.push(dataObj.data.earnings.hra.val);
            hra.cumulativeData[1]+=dataObj.data.earnings.hra.val;
            chartData.earnings[1].data.push(dataObj.data.earnings.hra.val);

            fbp.data.push(dataObj.data.earnings.fbp.val);
            fbp.cumulativeData[1]+=dataObj.data.earnings.fbp.val;
            chartData.earnings[2].data.push(dataObj.data.earnings.fbp.val);

            lta.data.push(dataObj.data.earnings.lta.val);
            lta.cumulativeData[1]+=dataObj.data.earnings.lta.val;
            chartData.earnings[3].data.push(dataObj.data.earnings.lta.val);

            conveyance.data.push(dataObj.data.earnings.conveyance.val||0);
            conveyance.cumulativeData[1]+=dataObj.data.earnings.conveyance.val;     
            chartData.earnings[4].data.push(dataObj.data.earnings.conveyance.val);

            earningsSum=dataObj.data.earnings.basic.val+dataObj.data.earnings.hra.val+dataObj.data.earnings.fbp.val+dataObj.data.earnings.lta.val+(dataObj.data.earnings.conveyance.val||0);
            earnings.data.push(earningsSum)
            earnings.cumulativeData[1]+=earningsSum;
            chartData.earnings[5].data.push(earningsSum);

            /*Deductions*/
            pf.data.push(dataObj.data.deductions.pf.val);
            pf.cumulativeData[1]+=dataObj.data.deductions.pf.val;
            chartData.deductions[0].data.push(dataObj.data.deductions.pf.val);

            pt.data.push(dataObj.data.deductions.pt.val);
            pt.cumulativeData[1]+=dataObj.data.deductions.pt.val;
            chartData.deductions[1].data.push(dataObj.data.deductions.pt.val);

            it.data.push(dataObj.data.deductions.it.val);
            it.cumulativeData[1]+=dataObj.data.deductions.it.val;
            chartData.deductions[2].data.push(dataObj.data.deductions.it.val);

            medInsPrem.data.push(dataObj.data.deductions.medInsPrem.val);
            medInsPrem.cumulativeData[1]+=dataObj.data.deductions.medInsPrem.val;
            chartData.deductions[3].data.push(dataObj.data.deductions.medInsPrem.val);

            deductionsSum=dataObj.data.deductions.pf.val+dataObj.data.deductions.pt.val+dataObj.data.deductions.it.val+dataObj.data.deductions.medInsPrem.val;
            deductions.data.push(deductionsSum);
            deductions.cumulativeData[1]+=deductionsSum;
            chartData.deductions[4].data.push(deductionsSum);

            /*Others*/
            fc.data.push(dataObj.data.others.fc.val);
            fc.cumulativeData[1]+=dataObj.data.others.fc.val;
            chartData.others[0].data.push(dataObj.data.others.fc.val);

            fcArrears.data.push(dataObj.data.others.fcArrears.val);
            fcArrears.cumulativeData[1]+=dataObj.data.others.fcArrears.val;
            chartData.others[1].data.push(dataObj.data.others.fcArrears.val);

            medicalReimbursement.data.push(dataObj.data.others.medicalReimbursement.val);
            medicalReimbursement.cumulativeData[1]+=dataObj.data.others.medicalReimbursement.val;
            chartData.others[2].data.push(dataObj.data.others.medicalReimbursement.val);

            medicalArrears.data.push(dataObj.data.others.medicalArrears.val);
            medicalArrears.cumulativeData[1]+=dataObj.data.others.medicalArrears.val;
            chartData.others[3].data.push(dataObj.data.others.medicalArrears.val);

            fuelAllowance.data.push(dataObj.data.others.fuelAllowance.val);
            fuelAllowance.cumulativeData[1]+=dataObj.data.others.fuelAllowance.val;
            chartData.others[4].data.push(dataObj.data.others.fuelAllowance.val);

            fuelArrears.data.push(dataObj.data.others.fuelArrears.val);
            fuelArrears.cumulativeData[1]+=dataObj.data.others.fuelArrears.val;
            chartData.others[5].data.push(dataObj.data.others.fuelArrears.val);

            carLeaseRental.data.push(dataObj.data.others.carLeaseRental.val);
            carLeaseRental.cumulativeData[1]+=dataObj.data.others.carLeaseRental.val;
            chartData.others[6].data.push(dataObj.data.others.carLeaseRental.val);

            carLeaseArrears.data.push(dataObj.data.others.carLeaseArrears.val);
            carLeaseArrears.cumulativeData[1]+=dataObj.data.others.carLeaseArrears.val;
            chartData.others[7].data.push(dataObj.data.others.carLeaseArrears.val);

            nps.data.push(dataObj.data.others.nps.val);
            nps.cumulativeData[1]+=dataObj.data.others.nps.val;
            chartData.others[8].data.push(dataObj.data.others.nps.val);

            giftAwards.data.push(dataObj.data.others.giftAwards.val);
            giftAwards.cumulativeData[1]+=dataObj.data.others.giftAwards.val;
            chartData.others[9].data.push(dataObj.data.others.giftAwards.val);

            othersSum=(dataObj.data.others.fc.val+dataObj.data.others.fcArrears.val+dataObj.data.others.medicalReimbursement.val+dataObj.data.others.medicalArrears.val+dataObj.data.others.fuelAllowance.val+dataObj.data.others.fuelArrears.val+dataObj.data.others.carLeaseRental.val+dataObj.data.others.carLeaseArrears.val+dataObj.data.others.nps.val+dataObj.data.others.giftAwards.val);
            others.data.push(othersSum);
            others.cumulativeData[1]+=othersSum;
            chartData.others[10].data.push(othersSum);

            netTotal.data.push(earningsSum-deductionsSum);
            netTotal.cumulativeData[1]+=earningsSum-deductionsSum;

            total.data.push(earningsSum-deductionsSum+othersSum);
            total.cumulativeData[1]+=earningsSum-deductionsSum+othersSum;
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

        return {
            gridData,
            chartData
        }

        
    }
    buildCharts(chartData){
        HighCharts.chart('earnings',{
            chart:{
                type:'line',
                width:600,
            },
            title:{
                text:'Earnings'
            },
            credits:{
                enabled:false,
            },
            legend:{
                enabled:true,
            },
            xAxis:{
                categories:chartData.xAxis,
                title:{
                    text:'Pay Period'
                }
            },
            series:chartData.earnings.slice(0,chartData.earnings.length-1)
        });
        HighCharts.chart('deductions',{
            chart:{
                type:'line',
                width:600,
            },
            title:{
                text:'Deductions'
            },
            credits:{
                enabled:false,
            },
            legend:{
                enabled:true,
            },
            xAxis:{
                categories:chartData.xAxis,
                title:{
                    text:'Pay Period'
                }
            },
            series:chartData.deductions.slice(0,chartData.deductions.length-1)
        });
        HighCharts.chart('others',{
            chart:{
                type:'line',
                width:600,
            },
            title:{
                text:'Others'
            },
            credits:{
                enabled:false,
            },
            legend:{
                enabled:true,
            },
            xAxis:{
                categories:chartData.xAxis,
                title:{
                    text:'Pay Period'
                }
            },
            series:chartData.others.splice(0,chartData.others.length-1)
        })
    }
    handleExp(_obj,_key,dataName,expandClk){
        _obj[_key]=!_obj[_key];
        this[expandClk]=dataName;
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
        if(this.cumexpandClick){
            console.log('NEW',document.getElementsByClassName(this.cumexpandClick));
            var testarray = document.getElementsByClassName(this.cumexpandClick);
            for(var i = 0; i < testarray.length; i++)
            {
                if(testarray[i].className.indexOf('hide')!==-1){
                    testarray[i].className=testarray[i].className.replace('hide','');
                }
                else{
                    testarray[i].className += " hide";
                }
            }
            this.cumexpandClick='';
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
                            <div className="right-panel-content">
                                <div className="grid-super-wrapper">
                                    <div className="grid-wrapper" >
                                        {this._data.map((data,ind)=>{
                                            return(
                                                <div className={("row ")+data.type+(data.type!==''?" hide":"")}>
                                                    {data.data.map((subData,subInd)=>{                                        
                                                        return(
                                                            <div className={(ind===0 || subInd===0?ind==0?"cell vheader":"cell rheader":"cell")+(data.type===''?" bold":"")} >
                                                                <span className={("label")+(data.type!=='' && subInd===0?" subH":" ")}>
                                                                    {subData?subData:0}
                                                                </span>
                                                                {data.hasOwnProperty('expand') && subInd===0?
                                                                    <span className="expand" onClick={this.handleExp.bind(this,data,'expand',subData,'expandClick')}>
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
                                    <div className="cumulative-grid-wrapper">
                                        {this._data.map((data,ind)=>{
                                            return(
                                                <div className={("row ")+data.cumtype+(data.cumtype!==''?" hide":"")}>
                                                    {data.cumulativeData.map((subData,subInd)=>{                                        
                                                        return(
                                                            <div className={(ind===0 || subInd===0?ind==0?"cell vheader":"cell rheader":"cell")+(data.type===''?" bold":"")} >
                                                                <span className={("label")+(data.type!=='' && subInd===0?" subH":" ")}>
                                                                    {subData?subData:0}
                                                                </span>
                                                                {data.hasOwnProperty('cumexpand') && subInd===0?
                                                                    <span className="expand" onClick={this.handleExp.bind(this,data,'cumexpand','cum'+subData,'cumexpandClick')}>
                                                                        {data.cumexpand?"-":"+"}
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
                                <div className="chart-super-wrapper">
                                    <div className="chart-wrapper" id="earnings"> 
                                    </div>
                                    <div className="chart-wrapper" id="deductions"> 
                                    </div>
                                    <div className="chart-wrapper" id="others"> 
                                    </div>
                                </div>
                            </div> 
                        }                 
                </div>
                

            </div>
        )
    }
}