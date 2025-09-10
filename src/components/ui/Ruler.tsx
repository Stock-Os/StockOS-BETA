import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  min: number;                // ex: 30
  max: number;                // ex: 200
  step?: number;              // ex: 0.1
  initialValue?: number;      // ex: 62
  fractionDigits?: number;    // ex: 1
  unit?: string;              // ex: "kg"
  tickSpacing?: number;       // px entre deux ticks (par défaut 8)
  majorEvery?: number;        // nombre de minor ticks par major (par défaut 10 => 1.0 si step=0.1)
  onValueChange?: (v: number) => void;
  onValueChangeEnd?: (v: number) => void;
  indicatorColor?: string;
  shortTickColor?: string;
  longTickColor?: string;
  labelColor?: string;
};

export default function Ruler({
  min,
  max,
  step = 0.1,
  initialValue = min,
  fractionDigits,
  unit = "",
  tickSpacing = 8,
  majorEvery = 10,
  onValueChange,
  onValueChangeEnd,
  indicatorColor = "#000",
  shortTickColor = "#999",
  longTickColor = "#000",
  labelColor = "#000",
}: Props) {
  const digits =
    typeof fractionDigits === "number"
      ? fractionDigits
      : Math.max(0, (step.toString().split(".")[1] || "").length);
  const scrollRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get("window").width);
  const centerInset = useMemo(() => containerWidth / 2, [containerWidth]);

  const totalSteps = useMemo(
    () => Math.round((max - min) / step),
    [min, max, step]
  );

  const initialOffset = useMemo(() => {
    const clamped = Math.min(Math.max(initialValue, min), max);
    const stepsFromMin = Math.round((clamped - min) / step);
    return stepsFromMin * tickSpacing;
  }, [initialValue, min, max, step, tickSpacing]);

  const [value, setValue] = useState(
    parseFloat(initialValue.toFixed(digits))
  );

  const offsetX = useRef(new Animated.Value(initialOffset)).current;

  // derive live value from scroll offset
  useEffect(() => {
    const sub = offsetX.addListener(({ value: x }) => {
      const stepsFromMin = Math.round(x / tickSpacing);
      const raw = min + stepsFromMin * step;
      const clamped = Math.min(Math.max(raw, min), max);
      const rounded = parseFloat(clamped.toFixed(digits));
      setValue(rounded);
      onValueChange?.(rounded);
    });
    return () => offsetX.removeListener(sub);
  }, [digits, max, min, onValueChange, step, tickSpacing, offsetX]);

  // snap to nearest tick at end of scroll
  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const nearestSteps = Math.round(x / tickSpacing);
      const snapX = nearestSteps * tickSpacing;
      scrollRef.current?.scrollTo({ x: snapX, animated: true });
      const v = parseFloat((min + nearestSteps * step).toFixed(digits));
      onValueChangeEnd?.(v);
    },
    [digits, min, step, tickSpacing, onValueChangeEnd]
  );

  const onLayout = useCallback((evt: any) => {
    setContainerWidth(evt.nativeEvent.layout.width);
  }, []);

  const ticks = useMemo(() => {
    const arr = new Array(totalSteps + 1).fill(0).map((_, i) => {
      const isMajor = i % majorEvery === 0;
      const height = isMajor ? 28 : 14;
      const color = isMajor ? longTickColor : shortTickColor;
      const label =
        isMajor ? (min + i * step).toFixed(step >= 1 ? 0 : 0) : null; // labels optionnels sur chaque 1.0
      return { i, isMajor, height, color, label };
    });
    return arr;
  }, [totalSteps, majorEvery, min, step, shortTickColor, longTickColor]);

  // bind Animated to ScrollView scrollX
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: offsetX } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    // scroll to initial offset after mount
    const id = setTimeout(() => {
      scrollRef.current?.scrollTo({ x: initialOffset, animated: false });
    }, 0);
    return () => clearTimeout(id);
  }, [initialOffset]);

  return (
    <View style={styles.root} onLayout={onLayout}>
      <View style={styles.rulerContainer}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={tickSpacing}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingLeft: centerInset,
            paddingRight: centerInset,
            alignItems: "flex-end",
          }}
          onScroll={onScroll}
          onMomentumScrollEnd={handleMomentumEnd}
        >
          <View style={styles.ticksRow}>
            {ticks.map(({ i, height, color, isMajor }) => (
              <View key={i} style={{ width: tickSpacing, alignItems: "center" }}>
                <View
                  style={{
                    width: 2,
                    height,
                    backgroundColor: color,
                    borderRadius: 1,
                  }}
                />
                {isMajor && (
                  <View style={{ height: 6 }} />
                )}
              </View>
            ))}
          </View>
        </Animated.ScrollView>

        <View
          pointerEvents="none"
          style={[
            styles.indicator,
            { left: centerInset - 1, backgroundColor: indicatorColor },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%" },
  rulerContainer: {
    height: 60,
    position: "relative",
    width: "100%",
  },
  ticksRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  indicator: {
    position: "absolute",
    top: 0,
    width: 2,
    height: "100%",
  },
});