import {View, Text} from 'react-native';
import React from 'react';

const TaskDetailsScreen = ({route, navigation}) => {
  const {task} = route.params;
  return (
    <View>
      <Text>{task.title}</Text>
    </View>
  );
};

export default TaskDetailsScreen;
