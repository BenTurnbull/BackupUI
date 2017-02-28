import React from 'react';

export default class Restore extends React.Component {

  constructor(props, context) {
    super(props, context);

    // Dropdown block is inactive & hidden by default
    this.state = {
      dropdownIsActive: false,
    };
  }

  _configurationSelected() {
    this.setState({
      backupSelected: false,
      restoreSelected: false,
      configurationSelected: true,
    });
  }

  render() {
    const dropdownId = this.props.id;
    const { dropdownIsVisible } = this.state;
    return (
      <div className="restore-container">
          <h2> Restore Settings </h2>
          
      </div>
    );
  }
}
