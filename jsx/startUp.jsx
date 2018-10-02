import React from 'react';
import Content from './content.jsx';

class StartUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            renderComponent:false,
        };
        this.menuFlag=false;
        this.page='';
    }
    handleMenuClick(e){
        e.stopPropagation();
        this.menuFlag=!this.menuFlag;
        this.renderComponent();
    }
    renderComponent(){
        this.setState({
            renderComponent:!this.state.renderComponent,
        })
    }
    handleInsideClick(e){
        e.stopPropagation();
    }
    menuRender(){
        return(
            <div className="menu-wrapper" onClick={this.handleInsideClick.bind(this)}>
                <div className="list">
                    <div className="list-item" onClick={this.handleMenuItem.bind(this,'payslip')}>
                        PaySlip 
                    </div>
                    <div className="list-item"  onClick={this.handleMenuItem.bind(this,'bank')}>
                        Bank Statements
                    </div>
                    <div className="list-item"  onClick={this.handleMenuItem.bind(this,'cog')}>
                        Cognitive Analysis
                    </div>
                    <div className="list-item"  onClick={this.handleMenuItem.bind(this,'about')}>
                        About FinMetrics
                    </div>
                </div>
            </div>
        )
    }
    handleMenuClose(){
        this.menuFlag=false;
        this.renderComponent();
    }
    handleMenuItem(menuItem){
        this.page=menuItem;
        this.handleMenuClose();
    }
    render(){
        console.log("this.state.",this);
        return(
            <div className="startup-wrapper" onClick={this.handleMenuClose.bind(this)}>
                <div className="startup-bg-img">
                </div>
                <div className="startup-content">
                    <div className="startup-header">
                        <div className="logo-text">
                            finMetrics
                        </div>
                        <div className="menu" onClick={this.handleMenuClick.bind(this)}>
                            <img src="../img/menu.png" width="25"></img>
                        </div>
                    </div>
                    <div className="startup-content-menu">
                        {this.menuFlag?
                            this.menuRender()
                        :
                            null    
                        }
                    </div>
                    {this.page!==''?
                        <Content page={this.page}/>
                    :
                        null
                    }
                </div>
            </div>           
        )
    }
}
export default StartUp;