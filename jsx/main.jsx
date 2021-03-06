import React from 'react';
import StartUp from './startUp.jsx';

class Main extends React.Component{
    constructor(props){
        super(props);
    }
    readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    start(){
          
        //usage:
        this.readTextFile("./des/analysedData.json", function(text){
            var data = JSON.parse(text);
            console.log(data);
        });
    }
    render(){
        return(
            <div className="finMetrics_wrapper">
                <StartUp />
              
            </div>
        )
    }
}
export default Main;