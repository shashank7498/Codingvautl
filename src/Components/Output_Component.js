import React, {Component} from 'react';
import './codemirror.css';



class Output_Component extends Component {
    
render(){ 
     let temp=this.props.Output;
    return (

        <div className="output-container">
        <h2>Output:</h2>
           <h4>{temp}</h4>
        </div>
    );
}
}
export default Output_Component;