import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector as createSelector } from 'reselect';
import { ipcRenderer } from 'electron';

import * as modalActions from '../Modal/actions';

class Home extends Component {

  constructor(props) {
    super(props);
    this.startScreenWorker = this.startScreenWorker.bind(this);
  };

  componentDidMount() {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log('RENDERER: receiving event');
      console.log(`event`,event);
      console.log(`arg`,arg);
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.startScreenWorker}>
          Start
        </button>
      </div>
    );
  };

  startScreenWorker() {
    console.log('RENDERER: sending event');
    ipcRenderer.send(
      'asynchronous-message',
      {start: true, files: ['000','001']}
    );
  };
}

export const mapStateToProps = createSelector({});

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

  const { dispatch } = dispatchProps;

  return {
    openModal: () => {
      dispatch(push({
        pathname: '/',
        search:'entry=77',
        query:{entry:'77'},
      }));
      dispatch(modalActions.show());
    },
    goToCounter: () => {
      dispatch(push('/count'));
    },
    sendSearch(search:string) {
      console.log('sendSearch',search);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Home);
