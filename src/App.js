import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';

import RootNavigator from './navigation/RootNavigator';

const App = () => (
  <Fragment>
    <StatusBar barStyle="light-content" />
    <RootNavigator />
  </Fragment>
);

export default App;
