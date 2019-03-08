import React from 'react';
import { Button } from 'native-base';

import { screens } from '../../navigation/constants';

export default class Home extends React.PureComponent {
  static navigationOptions = {
    headerTitle: 'Home',
  };

  handlePressStart = () => {
    this.props.navigation.navigate(screens.Camera);
  };

  render() {
    return (
      <View>
        <Button onPress={this.handlePressStart} title="Start Recording" />
      </View>
    );
  }
}
