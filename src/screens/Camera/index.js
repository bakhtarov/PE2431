import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { screens } from '../../navigation/constants';
import styles from './styles';

const MAXFILESIZE = 20 * 1024 * 1024 * 1024;
const MAXDURATION = 10 * 60;
const RECORDQUALITY = RNCamera.Constants.VideoQuality['480p'];

const options = {
  quality: RECORDQUALITY,
};

const CAMERA_CONFIG = {
  flash: 'off',
  zoom: 0,
  depth: 0,
  whiteBalance: 'auto',
  ratio: '16:9',
};

class Camera extends Component {
  state = {
    isRecording: false,
    record: null,
  };

  static navigationOptions = {
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 },
  };

  recordVideo = async camera => {
    if (this.state.isRecording) {
      this.setState({ isRecording: false }, () => {
        camera.stopRecording();
      });
    } else {
      this.setState({ isRecording: true }, () => {
        camera.recordAsync(options).then(record => {
          this.setState({ record });
        });
      });
    }
  };

  handlePressPreview = () => {
    const { record } = this.state;
    this.props.navigation.navigate(screens.Preview, { record });
  };

  render() {
    const { isRecording, record } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        >
          {({ camera, status }) => {
            if (status !== 'READY') {
              return null;
            }
            return (
              <View style={styles.camera}>
                <TouchableOpacity
                  onPress={() => this.recordVideo(camera)}
                  style={styles.capture}
                >
                  <Text style={styles.font14}>
                    {isRecording ? 'STOP' : 'START'}
                  </Text>
                </TouchableOpacity>
                {Boolean(record) && (
                  <TouchableOpacity
                    onPress={this.handlePressPreview}
                    style={styles.capture}
                  >
                    <Text style={styles.font14}>{'PREVIEW'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

export default Camera;
