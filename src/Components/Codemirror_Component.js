import React, {Component} from 'react';
import './codemirror.css';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/theme/monokai.css';
import Output_Component from './Output_Component';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/anyword-hint.js');
require('codemirror/addon/hint/javascript-hint');
require('codemirror/addon/hint/show-hint');
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');


var defaults = {
   	java: 'public class Simple{  public static void main(String args[]){ //Do  not change class name and dont create another public class   }  } ',
    javascript: 'console.log("Hello World")',
    python:'print("Hello World!")',
};

class Codemirror_Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: defaults.java,
            theme:'material',
            mode: 'text/x-java',
            source_code:defaults.java,
            test_cases:'\n',
            output:'',
            error:'',
            iscompiled:true,
            exitcode:0

        };
      }
    changeMode (e) {
		let mode = e.target.value;
		this.setState({
            mode: mode
		});
    }
    changeTheme (e){
        let theme = e.target.value;
		this.setState({
            theme:theme
		});
    }
    handleSubmit = (event) => {
      event.preventDefault();
      let url=this.state.mode;
      switch (url) {
        case 'python':
          url='/python'
          this.setState({
            test_cases:null
          })
          break;
        case 'text/x-csrc':
          url='/c'
          this.setState({
            test_cases:'\0'
          })
          break;
        case 'text/x-java':
          url='/java'
          this.setState({
            test_cases:'\n'
          })
          break;
        case 'text/x-c++src':
          url='/cpp'
          this.setState({
            test_cases:'\0'
          })
          break;
        default:
          url='/javascript'
          this.setState({
            test_cases:null
          })
      }
     
      fetch( url, {
          method: 'POST',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify(this.state),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin'
        }) .then(response => response.json())
        .then(data => 
          {
            this.setState({
            error:data.stderr,
            output:data.stdout,
            exitcode:data.exitCode
          
        })});
      
     
  }
render(){ 
   console.log("inside codemirror");
   console.log(this.state.output);
   console.log(this.state.error);
  console.log(this.state.exitcode);
  //  let variable=this.state.error;
  // console.log(this.state.iscompiled)
var options = {
    lineNumbers: true,
    mode: this.state.mode,
    theme:this.state.theme,
    extraKeys: {"Ctrl": "autocomplete"}
};
return (
<div>
   
  <div >
					<select onChange={this.changeMode.bind(this)} value={this.state.mode}>
            <option value="text/x-java">java</option>
            <option value="text/x-csrc">c</option>
            <option value="text/x-c++src">cpp</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <select onChange={this.changeTheme.bind(this)} value={this.state.theme}>
						<option value="material">Material</option>
						<option value="monokai">Monokai</option>
          </select>
          <CodeMirror
          value={this.state.code} 
          onChange={this.updateCode}
          options={options}
          onChange={(editor, data, value) => {
                  this.setState({
                  source_code:value
          });
              
          }}
          />
  </div>
              <form  onSubmit={this.handleSubmit}>
                <button type="submit" >Submit Code</button>
              </form>
            <div>
             
            <Output_Component  Output={this.state.exitcode ? this.state.error : this.state.output}/>
            </div>
</div>
);}}
export default Codemirror_Component;