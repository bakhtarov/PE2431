import React, { Component, Fragment } from 'react';
import { View, Text, Button, CameraRoll } from 'react-native';
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

  saveVideo = () => {
    this.player
      .save()
      .then(response => CameraRoll.saveToCameraRoll(response.uri, 'video'));

    this.props.navigation.popToTop();
  };

  render() {
    const { uri } = this.props.navigation.state.params.record;
    const { filterType } = this.state;

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default Preview;
