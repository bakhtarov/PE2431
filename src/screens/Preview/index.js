import React from 'react';
import { View, Text } from 'react-native';

const Preview = props => {
  console.log('props:::', props);

  return (
    <View>
      <Text>{props.navigation.state.params.record.uri}</Text>
    </View>
  );
};

export default Preview;
