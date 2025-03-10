import React, {RefObject, useRef} from 'react';
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {list} from './MockData';
import VideoPage from './VideoPage';
import Video from 'react-native-video';
import {VideoEvent} from '@agnal/react-native-miniplayer';

export const Item = ({
  item,
  flatListRef,
  index,
  currentP,
}: {
  flatListRef?: RefObject<View>;
  item: any;
  index: number;
  currentP: RefObject<number>;
}) => {
  const viewRef = useRef<TouchableOpacity>(null);

  const getCurrentPostion = () =>
    new Promise<number>((resovle, reject) => {
      if (viewRef.current && flatListRef?.current) {
        viewRef.current?.measureLayout(
          flatListRef.current,
          (_, top) => {
            resovle(top);
          },
          () => {
            reject('measurement failed');
          },
        );
      }
    });

  return (
    <TouchableOpacity
      ref={viewRef}
      style={{marginBottom: 20}}
      onPress={async () => {
        let fromPosition;
        if (flatListRef && currentP) {
          fromPosition = (await getCurrentPostion()) - (currentP.current ?? 0);
        }
        VideoEvent.openVideo({
          id: index + '_' + 'video',
          title: item.title,
          uri: item['video-uri'],
          subtitle: item.author,
          fromPosition,
          extraData: item,
        });
      }}>
      <Video
        source={{uri: item['video-uri']}}
        style={{width: '100%', height: 200}}
        resizeMode={'cover'}
        paused={true}
      />
      <Text style={{color: 'black', margin: 16}}>{item.title}</Text>
    </TouchableOpacity>
  );
};

function App(): JSX.Element {
  const viewRef = useRef<View>(null);
  const currentP = useRef<number>(0);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView ref={viewRef} style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} />
        <Text
          style={{
            fontSize: 24,
            paddingVertical: 12,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          This is the sample
        </Text>
        <FlatList
          data={list}
          onScroll={({nativeEvent: {contentOffset}}) => {
            currentP.current = contentOffset.y;
          }}
          renderItem={({item, index}) => (
            <Item
              index={index}
              item={item}
              flatListRef={viewRef}
              currentP={currentP}
            />
          )}
        />
      </SafeAreaView>
      <VideoPage />
    </GestureHandlerRootView>
  );
}

export default App;
