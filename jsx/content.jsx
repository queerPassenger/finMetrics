import React from 'react';

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
                    <div className="sub-content-header">
                        PAYSLIP
                    </div>
                    <div className="payslip-action">
                        <div className="folderName">
                            <div className="placeholder_input">
                                Location of the payslips
                            </div>
                            <input type="text" className={"location_input "+(this.payslip.file.locationPlaceHolder?"placeHolder":"header")} placeholder="" value={this.payslip.file.location} ref="payslip_location" onFocus={this.focusInput.bind(this,this.payslip.file,'locationPlaceHolder')} onChange={this.handlePaySlip.bind(this,this.payslip.file,'location','payslip_location')} />
                            
                        </div>
                    </div>
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