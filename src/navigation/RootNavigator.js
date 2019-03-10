import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import Camera from '../screens/Camera';
import Preview from '../screens/Preview';
import { screens } from './constants';

const RootNavigator = createStackNavigator({
  [screens.Home]: Home,
  [screens.Camera]: Camera,
  [screens.Preview]: Preview,
});

export default createAppContainer(RootNavigator);
