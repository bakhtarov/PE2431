import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../components/Home';
import Camera from '../components/Camera';
import Preview from '../components/Preview';
import { screens } from './constants';

const RootNavigator = createStackNavigator({
  [screens.Home]: Home,
  [screens.Camera]: Camera,
  [screens.Preview]: Preview,
});

export default createAppContainer(RootNavigator);
