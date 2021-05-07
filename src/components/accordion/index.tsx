import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
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
  initExpand = false,
  handleIcon,
  onChangeState,
  styleChevron,
  styleTouchable,
  isUnmountedContent = false,
  isBackgroundChevron = true,
  activeBackgroundIcon = '#d28a41',
  inactiveBackgroundIcon = '#4191d2',
  colorIcon = '#f44336',
  handleCustomTouchable,
  handleContentTouchable,
  handleCustomTouchableHeight,
}: AccordionProps) => {
  const [dimensions, setDimensions] = useState(
    handleCustomTouchableHeight ?? 0
  );

  console.log(initExpand);
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
    (next, prev) => {
      if (next !== undefined && next !== prev) {
        // @ts-ignore
        runOnJS(onChangeState)(next);
      }
    }
  );

  const handleCollapsed = useCallback(() => {
    if (size.value === 0) {
      runOnUI(() => {
        'worklet';
        size.value = dimensions;
      })();
    }
    open.value = !open.value;
  }, [dimensions, open, size]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const measuredHeight: number = event.nativeEvent.layout.height;

      if (dimensions !== measuredHeight) {
        setDimensions(measuredHeight);
      }
    },
    [dimensions]
  );

  const renderHeader = useCallback(() => {
    return handleCustomTouchable ? (
      handleCustomTouchable()
    ) : (
      <Animated.View style={[styles.header, styleTouchable]}>
        {handleContentTouchable ? handleContentTouchable() : null}
        <Chevron
          progress={progress}
          colorIcon={colorIcon}
          handleIcon={handleIcon}
          styleChevron={styleChevron}
          isBackgroundChevron={isBackgroundChevron}
          activeBackgroundIcon={activeBackgroundIcon}
          inactiveBackgroundIcon={inactiveBackgroundIcon}
        />
      </Animated.View>
    );
  }, [
    activeBackgroundIcon,
    colorIcon,
    handleContentTouchable,
    handleCustomTouchable,
    handleIcon,
    inactiveBackgroundIcon,
    isBackgroundChevron,
    progress,
    styleChevron,
    styleTouchable,
  ]);

  return (
    <>
      <TouchableWithoutFeedback onPress={handleCollapsed}>
        {renderHeader()}
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.content, style]}>
        <View onLayout={handleLayout} style={styles.container}>
          {isUnmountedContent ? null : children}
        </View>
      </Animated.View>
    </>
  );
};

export { CollapsedView };
