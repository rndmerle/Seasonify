/* eslint-disable no-console */
import { reactotronRedux } from 'reactotron-redux';
import Reactotron, { overlay, trackGlobalErrors } from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';

import Config from './DebugConfig';

if (Config.useReactotron) {
  Reactotron.configure({
    // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
    name: 'Seasonify',
  })
    // forward all errors to Reactotron
    .use(
      trackGlobalErrors({
        // ignore all error frames from react-native (for example)
        veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0,
      }),
    )
    // add overlay ability for graphics
    .use(overlay())
    // main react binding
    .useReactNative()
    // setup the redux integration with Reactotron
    .use(
      reactotronRedux({
        // you can flag some of your actions as important by returning true here
        // isActionImportant: action => action.type === StartupTypes.STARTUP,

        // you can flag to exclude certain types too... especially the chatty ones
        except: [], // 'STARTUP', 'persist/REHYDRATE', 'EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'
      }),
    )
    // register the redux-saga plugin so we can use the monitor in CreateStore.js
    .use(sagaPlugin())
    // let's connect!
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron;

  // (when not into Chrome devtools) replace the regular console.log with Reactotron.display. If more than 1 argument supplied, the first argument is considered a title.
  const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
  const hijackConsole = browserConsole => {
    console.log = (...args) => {
      if (isDebuggingInChrome) {
        browserConsole(...args);
      }
      let name = null;
      let value = null;
      let preview = null;
      switch (args.length) {
        case 1:
          name = 'CONSOLE.LOG';
          value = args[0];
          preview = typeof args[0] === 'object' ? JSON.stringify(args[0]) : args[0];
          break;
        case 2:
          name = args[0];
          value = args[1];
          preview = typeof args[1] === 'object' ? JSON.stringify(args[1]) : args[1];
          break;
        default:
          name = args[0];
          value = args.slice(1);
          preview = JSON.stringify(args.slice(1));
      }
      const isNotImportant =
        name !== undefined &&
        preview !== undefined &&
        Config.notImportantLogs &&
        Config.notImportantLogs.some(
          needle =>
            (typeof name === 'string' && name.startsWith(needle)) ||
            (typeof preview === 'string' && preview.startsWith(needle)),
        );
      Reactotron.display({
        name,
        value,
        preview,
        important: !isNotImportant,
      });
    };
  };
  hijackConsole(console.log);
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false,
    overlay: App => App,
  };
}
