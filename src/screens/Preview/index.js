import React, { Component, Fragment } from 'react';
import { View, Text, Button, CameraRoll } from 'react-native';
import Video from 'react-native-video';
import { TouchableHighlight } from 'react-native-gesture-handler';

import styles from './styles';

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

  FILTERTYPE = [
    { key: 'process', type: 'CIPhotoEffectProcess' },
    { key: 'tonal', type: 'CIPhotoEffectTonal' },
    { key: 'transfer', type: 'CIPhotoEffectTransfer' },
    { key: 'sepia', type: 'CISepiaTone' },
  ];

  componentDidMount() {
    this.props.navigation.setParams({
      saveVideo: this.saveVideo,
    });
  }

  onChangeFilter = filterType => {
    this.setState({ filterType });
    this.player.seek(0);
  };

  saveVideo = () => {
    this.player
      .save()
      .then(video => CameraRoll.saveToCameraRoll(video.uri, 'video'));

    this.props.navigation.popToTop();
  };

  setPlayerRef = ref => {
    this.player = ref;
  };

  render() {
    const { uri } = this.props.navigation.state.params.record;
    const { filterType } = this.state;

    return (
      <Fragment>
        <View style={styles.container}>
          <Video
            source={{ uri }}
            ref={this.setPlayerRef}
            filterEnabled
            filter={filterType}
            fullscreen
            controls
            pictureInPicture
            style={styles.backgroundVideo}
          />
        </View>
        <View style={styles.filtersContainer}>
          {this.FILTERTYPE.map(filter => {
            const isApplied = filter.type === filterType;
            return (
              <TouchableHighlight
                key={filter.type}
                onPress={() => this.onChangeFilter(filter.type)}
                style={styles.filterWrapper}
              >
                <Text style={{ color: isApplied ? 'red' : 'white' }}>
                  {filter.key}
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
