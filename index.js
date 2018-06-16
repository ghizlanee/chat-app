import { AppRegistry } from 'react-native';
import App from './source/App';

AppRegistry.registerComponent('ChatProject', () => App);
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
