import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Video from 'react-native-video';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { styles } from './styles';

const FilterType = {
  PROCESS: 'CIPhotoEffectProcess',
  TONAL: 'CIPhotoEffectTonal',
  TRANSFER: 'CIPhotoEffectTransfer',
  SEPIA: 'CISepiaTone',
};

class Preview extends Component {
  state = {
    filterType: null,
  };

  onChangeFilter = type => {
    this.setState({ filterType: FilterType[type] });
    this.player.seek(0);
  };

  render() {
    console.log('props:::', this.props);
    console.log('this.player:::', this.player);

    const { uri } = this.props.navigation.state.params.record;
    const { filterType } = this.state;
    return (
      <>
        <View style={{ flex: 8 }}>
          <Video
            source={{ uri }}
            ref={ref => {
              this.player = ref;
            }}
            filterEnabled
            filter={filterType}
            fullscreen
            controls
            pictureInPicture
            style={styles.backgroundVideo}
            onEnd={() => this.setState({ isPlayed: true })}
          />
        </View>
        <View style={styles.filtersContainer}>
          {Object.keys(FilterType).map(key => (
            <TouchableHighlight
              key={key}
              onPress={() => this.onChangeFilter(key)}
              style={styles.filterWrapper}
            >
              <Text
                style={{
                  color: FilterType[key] === filterType ? 'red' : 'white',
                  padding: 20,
                }}
              >
                {key.toLowerCase()}
              </Text>
            </TouchableHighlight>
          ))}
        </View>
      </>
    );
  }
}

export default Preview;
