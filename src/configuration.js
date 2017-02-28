import React from 'react';

export default class Configuration extends React.Component {

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
      <div className="configuration-container">
          <h2> Configuration </h2>
          
      </div>
    );
  }
}
