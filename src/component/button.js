import React from 'react';

export default class Button extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let value = this.props.value;
    let callback = this.props.callback;
    return <input className="ghost-btn" type="button" name="btn" value={value} onClick={callback}/>;
  }
}
