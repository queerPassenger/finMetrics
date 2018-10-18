import React from 'react';

export default class Sample extends React.Component{
    constructor(props){
        super(props);
        this.data=[[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    }
    render(){
        return(
            <div className="sample-wrapper">
                <div className="wrapper">
                    {this.data.map(_data=>{
                        return(
                            <div className="rowData">
                                {_data.map(_subData=>{
                                    return(
                                        <div className="subData">
                                        {_subData}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                        
                    })}
                    
                </div>
            </div>
        )
    }
}