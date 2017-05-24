import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Progress } from 'semantic-ui-react';

import CallToAction from '../CTAContainer/CTAContainer';
import AccountInfo from '../AccountInfoContainer/AccountInfoContainer';
import PaymentForm from '../PaymentContainer/PaymentContainer';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      step: 1,
    }

    this.handleContinue = this.handleContinue.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
  }

  handleContinue(e) {
    debugger;
    this.setState({
      step: this.state.step+=1
    });
    // make the request for braintree token,
    // plus fire the event for analytics
    // send attribution data.
  }

  handleStepBack(e) {
    this.setState({
      step: this.state.step--
    });
    // make the request for braintree token,
    // plus fire the event for analytics
    // send attribution data.
  }


  renderModal() {

    const stepsMap = {
      1: (<CallToAction handleContinue={this.handleContinue}/>),
      2: (<AccountInfo handleContinue={this.handleContinue}/>),
      3: (<PaymentForm handleContinue={this.handleContinue}/>),
      4: (<div />)
    }
    return stepsMap[this.state.step];

  }

  render() {
    const progress = (this.state.step / 5) * 100;

    const renderedElement = this.renderModal();

    return (
      <Modal
        defaultOpen={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
        <Progress
          percent={progress}
          indicating
          size="tiny">
        </Progress>
        {renderedElement}
      </Modal>
    );
  }
}

const {
  string
} = PropTypes;

BaseContainer.propTypes = {
  componentName: string
};

BaseContainer.defaultProps = {
  componentName: 'BaseContainer'
};

export default BaseContainer;
