import React from 'react';
import centerComponent from 'react-center-component';

@centerComponent
export default class CenteredContainer extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    topOffset: React.PropTypes.number,
    leftOffset: React.PropTypes.number
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const {children, topOffset, leftOffset} = this.props;

    //width: 100,
    //height: 100,
    const dialogStyle = {
      position: 'absolute',
      left: this.props.leftOffset
    }

    return (
      <div style={dialogStyle}>
        {children}
      </div>
    )
  }
}
