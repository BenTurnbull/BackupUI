import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Options from './component/options.js'
import Backup from './backupConfiguration.js'
import Restore from './restoreConfiguration.js'
import Configuration from './configuration.js'

class Main extends Component {
  constructor(props){
    super();

    this.state = {
      view: undefined
    };

    this.setView = this.setView.bind(this);
  }

  setView(value) {
    this.setState({
      view: value
    });
  }

render(){
  const { view } = this.state;
  var call = this.setView;
  var options = ["Backup", "Restore", "Configuration"];

  return (
    <div>
    <Options
      default="Choose an option"
      options={options}
      classes="left large"
      callback={(e) => call(e)}/>
      {
        view === options[0] && <Backup/>
      }
      {
        view === options[1] && <Restore/>
      }
      {
        view === options[2] && <Configuration/>
      }
    </div>
    );
  }
}

var main = document.getElementById('main');
ReactDOM.render(<Main />, main);
