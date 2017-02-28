import React from 'react';

export default class Options extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      optionsVisible: false,
      optionsValue: this.props.default
    };

    this.toggleVisible = this.toggleVisible.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  toggleVisible() {
    const { optionsVisible } = this.state;
    // Toggle dropdown block visibility
    this.setState({ optionsVisible: !optionsVisible });
  }

  handleBlur() {
      // Clean up everything on blur
      this.setState({
        optionsVisible: false
      });
  }

  setValue(value) {
    this.setState({
      optionsValue: value
    });
  }

  render() {
    const { optionsVisible } = this.state;
    const { optionsValue } = this.state;

    let setValue = this.setValue;
    let callback = this.props.callback;
    let options = this.props.options.map(function(option) {
        return <li key={option} className={optionsValue === option ? "cs-selected" : ""} onClick={() => setValue(option) & callback(option)}><span>{option}</span></li>
      }
    );

    return (
      <div>
          <div
            className={`cs-select cs-skin-underline ${this.props.classes} ${optionsVisible ? 'cs-active' : ''}`}
            onBlur={this.handleBlur}
            onClick={this.toggleVisible}>
            <span className="cs-placeholder">{optionsValue}</span>
            {
              optionsVisible &&
              <div className="cs-options">
                <ul> { options } </ul>
              </div>
            }
          </div>
        </div>
        );
      }
}
