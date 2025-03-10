import {ScrollView, Text, View, StyleSheet} from 'react-native';
import React from 'react';
import VideoViewer, {
  VideoConfig,
  VideoData,
} from '@agnal/react-native-miniplayer';

VideoConfig.set({
  PrimaryColor: 'lightblue',
  MiniplayerHeight: 40,
  Actions: {
    previous: undefined,
    next: undefined,
  },
});

const VideoPage = () => {
  const renderContent = (data: VideoData) => {
    if (!data) return <></>;

    const {extraData} = data;
    const {commentCount, likeCount, dislikeCount, viewCount} = extraData;
    return (
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.videoTitle}>This is your custom content</Text>
          <Text style={styles.channelName}>React Native Masters</Text>

          <View style={styles.statsRow}>
            <Text style={styles.statsText}>
              {viewCount}M views • 3 days ago
            </Text>
            <View style={styles.likeContainer}>
              <Text style={styles.statsText}>👍 {likeCount}K</Text>
              <Text style={styles.statsText}>👎 {dislikeCount}K</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>
            Learn how to create a custom video player in React Native with
            advanced features like picture-in-picture, custom controls, and
            more. Perfect for beginners and intermediate developers.
          </Text>

          <View style={styles.actionsContainer}>
            <View style={styles.actionButton}>
              <Text style={styles.actionIcon}>📤</Text>
              <Text style={styles.actionText}>Share</Text>
            </View>
            <View style={styles.actionButton}>
              <Text style={styles.actionIcon}>💾</Text>
              <Text style={styles.actionText}>Save</Text>
            </View>
            <View style={styles.actionButton}>
              <Text style={styles.actionIcon}>⭐</Text>
              <Text style={styles.actionText}>Rate</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Comments ({commentCount})</Text>
          <View style={styles.comment}>
            <Text style={styles.commentAuthor}>John Doe</Text>
            <Text style={styles.commentText}>
              This video helped me solve my issue with video controls. Thank
              you!
            </Text>
          </View>
          <View style={styles.comment}>
            <Text style={styles.commentAuthor}>Jane Smith</Text>
            <Text style={styles.commentText}>
              Great tutorial! Could you make one about audio players next?
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderInteraction = (_?: VideoData) => {
    return <></>;
  };

  const RenderHeader = (videoData?: VideoData, statusBarHeight?: number) => {
    return (
      <View style={[styles.header, {paddingTop: statusBarHeight}]}>
        <Text style={styles.headerText}>{videoData?.title}</Text>
      </View>
    );
  };

  return (
    <VideoViewer
      RenderContent={renderContent}
      RenderInteraction={renderInteraction}
      RenderHeader={RenderHeader}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: 'black',
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  channelName: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#fff',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  comment: {
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
});

export default VideoPage;
