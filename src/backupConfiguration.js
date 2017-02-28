import React from 'react';
import Button from './component/button.js'
import BackupSelection from './backupSelection.js'
import CenterComponent from 'react-center-component';

export default class Backup extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let destinationOptions = ["Online", "Local"];

    return (
      <div className="backup-container">
        <h2> Backup Settings </h2>
          <div className="left stack-container">
            <h3 className="left"> Source </h3>
            <br/>
              <BackupSelection/>
          </div>

            <div className="right rbt-container">
              <h3 className="right"> Target </h3>
              <ul>
              <li>
                <input type="radio" id="f-option" name="selector" defaultChecked/>
                <label htmlFor="f-option">Online</label>
                <div className="check"></div>
              </li>

              <li>
                <input type="radio" id="s-option" name="selector"/>
                <label htmlFor="s-option">Local</label>
                <div className="check"><div className="inside"></div></div>
              </li>
              </ul>
            </div>

          <br/>
            <Button value="Backup" callback={() => {}}/>
      </div>
    );
  }
}
