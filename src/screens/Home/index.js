import React from 'react';
import { Button, View } from 'react-native';

import { screens } from '../../navigation/constants';
import { styles } from './styles';

export default class Home extends React.PureComponent {
  static navigationOptions = {
    headerTitle: 'Home',
    headerTransparent: true,
  };

  handlePressStart = () => {
    this.props.navigation.navigate(screens.Camera);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handlePressStart} title="Start Recording" />
      </View>
    );
  }
}
