import { StyleSheet, Image, Platform, Text } from 'react-native';
import { getMethCount } from './sharedValues';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useFocusEffect } from '@react-navigation/native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';

export default function TabTwoScreen() {
  const [methCount, setMethCount] = useState(getMethCount());

  useFocusEffect(() => {
    setMethCount(getMethCount());
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
        <Text style={styles.mediumText}>{methCount}</Text>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  mediumText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
