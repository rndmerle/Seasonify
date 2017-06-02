/* eslint-disable no-console */
import Config from 'app/Config/DebugConfig';

export default function navigationLogging(prevState, currentState, action) {
  if (Config.navigationLogging) {
    console.group('Navigation Dispatch: ');
    console.log('Action: ', action);
    console.log('New State: ', currentState);
    console.log('Last State: ', prevState);
    console.groupEnd();
  }
}
