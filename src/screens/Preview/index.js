import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
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

  static navigationOptions = ({
    navigation: {
      state: { params },
    },
  }) => {
    return {
      headerStyle: {
        backgroundColor: '#000',
        borderBottomWidth: 0,
      },
      headerRight: <Button onPress={params.saveVideo} title="Save" />,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      saveVideo: this.saveVideo,
    });
  }

  onChangeFilter = type => {
    this.setState({ filterType: FilterType[type] });
    this.player.seek(0);
  };

  saveVideo = async () => {
    const video = await this.player.save();
    console.log('video::::', video);
    this.props.navigation.popToTop();
  };

  render() {
    console.log('props:::', this.props);
    console.log('this.player:::', this.player);

    const { uri } = this.props.navigation.state.params.record;
    const { filterType } = this.state;

    return (
      <>
        <View style={styles.container}>
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
          />
        </View>
        <View style={styles.filtersContainer}>
          {Object.keys(FilterType).map(key => {
            const isApplied = FilterType[key] === filterType;
            return (
              <TouchableHighlight
                key={key}
                onPress={() => this.onChangeFilter(key)}
                style={styles.filterWrapper}
              >
                <Text style={{ color: isApplied ? 'red' : 'white' }}>
                  {key.toLowerCase()}
                </Text>
              </TouchableHighlight>
            );
          })}
        </View>
      </>
    );
  }
}

export default Preview;
