import React from 'react';
import Payslip from './payslip.jsx';

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state={
            renderComponent:false,
        }
        this.page=this.props.page;
        this.payslip={
            file:{
                location:'',
                locationPlaceHolder:true,
                files:[],
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(JSON.stringify(nextProps.page)!=JSON.stringify(this.page)){
            this.page=nextProps.page;
            this.renderComponent();

        }
    }
    focusInput(_obj,key){
        _obj[key]=false;
    }
    renderComponent(){
        this.setState({
            renderComponent:!this.state.renderComponent,
        })
    }
    handlePaySlip(_obj,key,refName){
        _obj[key]=this.refs[refName].value;
        this.renderComponent();
    }
    
    renderPage(){
        if(this.page==='payslip'){
            return(
                <div className="sub-content-wrapper">
                    <Payslip />
                </div>
            )
        }
    }
    render(){
        return(
            <div className="content-wrapper">
                {this.renderPage()}
            </div>
        )
    }
}
export default Content;