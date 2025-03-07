# React Native Mini Player Sample

This is a sample project demonstrating how to implement a mini player in a React Native application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

This library requires other dependencies:

- react-native-video
- react-native-reanimated
- react-native-orientation-locker
- react-native-gesture-handler

Install them if they are not in your project:

```sh
yarn add react-native-video react-native-reanimated react-native-orientation-locker react-native-gesture-handler
```

These are the suitable versions for each React Native version:
| React Native Version | Dependency | Dependency Version |
|----------------------|------------|-------------------|
| 0.72. _ | react-native-video | 6.5. _ |
| | react-native-reanimated react-native-orientation-locker react-native-gesture-handler | \* |

Install the library:

```sh
yarn add @agnal/react-native-miniplayer
```

## Features

## Usage

Please clone this sample project and run it to test the playground

Here are the exported components and features:

```jsx
import VideoViewer, {
  VideoConfig,
  VideoData,
  VideoEvent,
} from '@agnal/react-native-miniplayer';
```

- [VideoViewer](#videoviewer)
- [VideoData](#videodata)
- [VideoEvent](#videoevent)
- [VideoConfig](#videoconfig)

### VideoViewer

Place this component in the root component as shown below, so that it can be accessed from other components.

```jsx
import VideoViewer from '@agnal/react-native-miniplayer'';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Other components */}
      <VideoViewer />
    </View>
  );
};

export default App;
```

Component's properties:
| Property | Description | Type | Sample |
|----------------|------------------------------------------------------|---------------------------------------------------|--------|
| `RenderHeader` | Display your custom component above the video in normal mode | `(videoData?: VideoData) => ReactNode` (if undefined, it will not show) | |
| `RenderContent` | Display your custom component below the video | `(videoData?: VideoData) => ReactNode` (if undefined, it will not show) | |

### VideoData

Object's attributes

| Attribute      | Description                                                                                                              | Sample |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ------ |
| `id`           | string (required) - Unique identifier for the video                                                                      |        |
| `uri`          | string (required) - Video streaming URI or local URI                                                                     |        |
| `thumbnailUri` | string or undefined - Image URI or local URI displayed while loading the video                                           |        |
| `title`        | string or undefined - Video title displayed in mini mode                                                                 |        |
| `subtitle`     | string or undefined - Video subtitle displayed in mini mode                                                              |        |
| `extraData`    | any - Additional data in case you want to dynamically render `RenderHeader`/`RenderContent`. See the sample for details. |        |

### VideoEvent

#### Play video

```jsx
VideoEvent.openVideo({
  id: index + '_' + 'video',
  uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  title: 'Big Buck Bunny',
  subtitle: 'Blender Foundation',
  extraData: {
    liked: true,
    commentCount: 10,
  },
});
```

#### Close video

```jsx
VideoEvent.closeVideo();
```

#### Minimize video to mini player

```jsx
VideoEvent.minimizeVideo();
```

#### Listen to events

```jsx
VideoEvent.addEventListener();
VideoEvent.removeEventListener();
VideoEvent.removeEventListeners([...ids]);

/** example */
const progressEventId = VideoEvent.addEventListener(
  'progress',
  (second: number) => {
    // Your code
  },
);
VideoEvent.removeEventListener(progressId);

const unmountVideoId = VideoEvent.addEventListener('unmountVideo', () => {
  // Your code
});

VideoEvent.removeEventListener(progressEventId);
VideoEvent.removeEventListener(unmountVideoId);
VideoEvent.removeEventListeners([progressEventId, unmountVideoId]);
```

##### Event Types

| Type                 | Description                                   | Event Function Argument |
| -------------------- | --------------------------------------------- | ----------------------- |
| `progress`           | Updates the current time of the video         | `second: number`        |
| `unmountVideo`       | Triggered when the current video is closed    | No argument             |
| `pressPreviousVideo` | Triggered when the previous button is pressed | No argument             |
| `pressNextVideo`     | Triggered when the next button is pressed     | No argument             |

### VideoConfig

Place this code above the `VideoViewer` component:

```jsx
import VideoViewer, {VideoConfig} from '@agnal/react-native-miniplayer'';
/** Where */
VideoConfig.set({
  PrimaryColor: 'lightblue',
  MiniplayerHeight: 40,
});

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Other components */}
      <VideoViewer />
    </View>
  );
};

export default App;
```

Attributes to set

| Attribute           | Type                                                                         | Default value |
| ------------------- | ---------------------------------------------------------------------------- | ------------- |
| `PrimaryColor?`     | string - the progress color                                                  |
| `Actions?`          | For more details, check the [Action Options](#action-options) section below. |               |
| `MiniplayerBottom?` | number - the space between mini player and the bottom                        | 64            |
| `MiniplayerHeight?` | number - the mini player height                                              | 80            |
| `HeaderHeight?`     | number - the height of render `RenderHeader`                                 | 56            |
| `SeekStepSeconds?`  | number - the seeking step seconds                                            | 10            |
| `Theme?`            | 'light'                                                                      | 'dark'        |

##### Action Options

If the `icon` is `undefined`, the icon will not be displayed but the button can still be pressed to perform the action.
If actions like `expand`, `seekForward`, etc., are `undefined`, those actions will be hidden.

Example:

```jsx
VideoConfig.set({
  Actions: {
    play: {
      icon: require('your-path/play.png'),
    },
    pause: {
      icon: require('your-path/pause.png'),
    },
    close: {
      icon: require('your-path/close.png'),
    },
    expand: {
      fullIcon: require('your-path/full-screen.png'),
      minimizeIcon: require('your-path/minimize.png'),
    },
    seekForward: {},
    seekBackward: {},
    next: {
      icon: require('your-path/next.png'),
    },
    previous: {
      icon: require('your-path/previous.png'),
    },
  },
});
```

## Contributing

Please open an issue so that I can fix it or make a suggestion.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
