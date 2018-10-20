import React from 'react';

export default class Bank extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _:''
        };
        this._data=[];
        this.finYears=['2017-2018','2018-2019'];
        this.finYearSel=0;
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
        xhttp.open("GET", "/bankstatement/analyse?finYear="+this.finYears[this.finYearSel], true);
        xhttp.send();
    }
    getGridData(_data){
        console.log('_data insideGetGRidData',_data); 
        return _data;        
    }
    handleFinYearSel(ind){
        this.finYearSel=ind;
        this.handleAnalyse();
        this.setState({
            _:''
        });
    }
    render(){
        console.log('this._data',this._data);
        return(
            <div className="bank-wrapper">
                <div className="bank-header-label">
                    Bank statement
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
                                    {this._data.data.map((data,ind)=>{
                                        return(
                                            <div className={ind===0?"header_row":"normal_row"}>
                                            {data.map((subData,subDataInd)=>{
                                                return(
                                                    <div className={(subDataInd===4?"larger_cell":"smaller_cell")}>
                                                        {subData}
                                                    </div>

                                                )
                                            })}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="expenditure-wrapper" >
                                    {this._data.expenditure.map((data,ind)=>{
                                        return(
                                            <div className={ind===0?"header_row":"normal_row"}>
                                            {data.map((subData,subDataInd)=>{
                                                return(
                                                    <div className={(subDataInd===3?"larger_cell":"smaller_cell")}>
                                                        {subData}
                                                    </div>

                                                )
                                            })}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="income-wrapper" >
                                    {this._data.income.map((data,ind)=>{
                                        return(
                                            <div className={ind===0?"header_row":"normal_row"}>
                                            {data.map((subData,subDataInd)=>{
                                                return(
                                                    <div className={(subDataInd===3?"larger_cell":"smaller_cell")}>
                                                        {subData}
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