import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CenterComponent from 'react-center-component';
import EventStack from 'active-event-stack';
import CloseCircle from './CloseCircle';
import keycode from 'keycode';
import dynamics from 'dynamics.js';

@CenterComponent
export default class ModalDialog extends React.Component {

  static propTypes = {
    onClose: PropTypes.func, // required for the close button
    className: PropTypes.string, // css class in addition to .ReactModalDialog
    width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), // width
    topOffset: PropTypes.number, // injected by @centerComponent
    leftOffset: PropTypes.number, // injected by @centerComponent
    margin: PropTypes.number.isRequired, // the margin around the dialog
    children: PropTypes.node,
    componentIsLeaving: PropTypes.bool,
    style: PropTypes.object,
    left: PropTypes.number,
    recenter: PropTypes.func.isRequired,
    top: PropTypes.number,
    dismissOnBackgroundClick: PropTypes.bool,
  }

  static defaultProps = {
    width: 'auto',
    margin: 20,
    dismissOnBackgroundClick: true,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      didAnimateInAlready : false,
    }
  }

  componentWillMount() {
    /*
    * This is done in the componentWillMount instead of the componentDidMount
    * because this way, a modal that is a child of another will have register
    * for events after its parent
    */
   this.eventToken = EventStack.addListenable([
     [ 'click', this.handleGlobalClick ],
     [ 'keydown', this.handleGlobalKeydown ],
   ]);
  }

  componentWillUnmount() {
    EventStack.removeListenable(this.eventToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.topOffset !== null && this.props.topOffset === null) {
      // This means we are getting top information for the first time
      if (!this.didAnimateInAlready) {
        // Double check we have not animated in yet
        this.animateIn();
      }
    }

    if (nextProps.componentIsLeaving && !this.props.componentIsLeaving) {
      const node = ReactDOM.findDOMNode(this);
      dynamics.animate(node, {
        scale: 1.2,
        opacity: 0,
      }, {
        duration: 300,
        type: dynamics.easeIn,
      });
    }
  }

  shouldClickDismiss = (event) => {
    const { target } = event;
    // This piece of code isolates targets which are fake clicked by things
    // like file-drop handlers
    if (target.tagName === 'INPUT' && target.type === 'file') {
      return false;
    }
    if (!this.props.dismissOnBackgroundClick) {
      if (target !== this.refs.self || this.refs.self.contains(target)) return false;
    } else {
      if (target === this.refs.self || this.refs.self.contains(target)) return false;
    }
    return true;
  }

  handleGlobalClick = (event) => {
    if (this.shouldClickDismiss(event)) {
      if (typeof this.props.onClose == 'function') {
        this.props.onClose();
      }
    }
  }

  handleGlobalKeydown = (event) => {
    if (keycode(event) === 'esc') {
      if (typeof this.props.onClose == 'function') {
        this.props.onClose();
      }
    }
  }

  animateIn = () => {
    this.didAnimateInAlready = true;

    // Animate this node once it is mounted
    const node = ReactDOM.findDOMNode(this);

    // This sets the scale...
    if (document.body.style.transform == null) {
      node.style.WebkitTransform = 'scale(0.5)';
    } else {
      node.style.transform = 'scale(0.5)';
    }

    dynamics.animate(node, {
      scale: 1,
    }, {
      type: dynamics.spring,
      duration: 500,
      friction: 400,
    });
  }

  render() {

    const { props: {
            children,
            className,
            componentIsLeaving, // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
            left, // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
            leftOffset,
            margin,
            onClose,
            recenter, // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
            style,
            top, // eslint-disable-line no-unused-vars, this line is used to remove parameters from rest
            topOffset,
            width,
            dismissOnBackgroundClick,
            ...rest}
        } = this;

    const dialogStyle = {
      position: 'absolute',
      marginBottom: margin,
      width: width,
      top: Math.max(topOffset, margin),
      left: leftOffset,
      ...style,
    };

    return <div {...rest} ref="self" className="modalDialog" style={dialogStyle}>
            {
              onClose &&
              <a className="closeButton" onClick={onClose}>
                <CloseCircle diameter={40}/>
              </a>
            }
            {children}
          </div>;
  }
}
