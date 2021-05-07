import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  runOnUI,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import type { LayoutChangeEvent } from 'react-native';
import { Chevron } from '../chevron';
import type { AccordionProps } from './types';
import { styles } from './styles';

const CollapsedView = ({
  children,
  handleHead: providerHead,
  handleContentHead,
  handleIcon,
  activeBackgroundIcon = '#d28a41',
  inactiveBackgroundIcon = '#4191d2',
  onChange,
  styleChevron,
  styleHeader,
  isBackgroundChevron = true,
  isUnmounted = false,
}: AccordionProps) => {
  const [height, setHeight] = useState(0);

  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
  );

  const size = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    height: size.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  useAnimatedReaction(
    () => open?.value,
    (next: boolean | undefined, prev) => {
      if (next !== undefined && next !== prev) {
        runOnJS(onChange)(next);
      }
    }
  );

  const handleCollapsed = useCallback(() => {
    if (size.value === 0) {
      runOnUI(() => {
        'worklet';
        size.value = measure(aref).height;
      })();
    }
    open.value = !open.value;
  }, [aref, open, size]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const measuredHeight = event.nativeEvent.layout.height;

      if (height !== measuredHeight) {
        setHeight(measuredHeight);
      }
    },
    [height]
  );

  const renderHeader = useCallback(() => {
    if (providerHead === null) {
      return null;
    }

    return (
      <Animated.View style={[styles.header, styleHeader]}>
        {handleContentHead()}
        <Chevron
          progress={progress}
          styleChevron={styleChevron}
          handleIcon={handleIcon}
          isBackgroundChevron={isBackgroundChevron}
          activeBackgroundIcon={activeBackgroundIcon}
          inactiveBackgroundIcon={inactiveBackgroundIcon}
        />
      </Animated.View>
    );
  }, [
    providerHead,
    styleHeader,
    handleContentHead,
    progress,
    styleChevron,
    handleIcon,
    isBackgroundChevron,
    activeBackgroundIcon,
    inactiveBackgroundIcon,
  ]);

  return (
    <>
      <TouchableWithoutFeedback onPress={handleCollapsed}>
        {renderHeader()}
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.content, style]}>
        <View ref={aref} onLayout={handleLayout} style={styles.container}>
          {isUnmounted ? null : children}
        </View>
      </Animated.View>
    </>
  );
};

export { CollapsedView };
