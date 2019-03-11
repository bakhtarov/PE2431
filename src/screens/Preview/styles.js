import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   backgroundColor: 'black',
  // },
  // preview: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    zIndex: 3,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  filterWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  font14: {
    fontSize: 14,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
