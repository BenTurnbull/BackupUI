import React, { PropTypes } from 'react';

import ModalPortal from './modalPortal';
import ModalBackground from './modalBackground';

export default class ModalContainer extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const {
      props: {
        children,
        ...rest,
      },
    } = this;

    return <ModalPortal {...rest}>
      <ModalBackground {...rest}>
        {children}
      </ModalBackground>
    </ModalPortal>;
  }
}
