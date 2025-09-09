import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useTheme } from '../../contexts/ThemeContext';
import { SleepRange, SleepSchedule } from '../../types';

interface SleepRangePickerProps {
  sleepRange: SleepRange;
  sleepSchedule?: SleepSchedule;
  onRangeChange: (range: SleepRange) => void;
  onScheduleChange?: (schedule: SleepSchedule) => void;
  showScheduleOption?: boolean;
}

export const SleepRangePicker: React.FC<SleepRangePickerProps> = ({
  sleepRange,
  sleepSchedule,
  onRangeChange,
  onScheduleChange,
  showScheduleOption = true,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'range' | 'schedule'>('range');
  
  const tabIndicatorPosition = useSharedValue(0);
  
  const tabIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(tabIndicatorPosition.value) }],
    };
  });

  const handleTabPress = (tab: 'range' | 'schedule') => {
    setActiveTab(tab);
    tabIndicatorPosition.value = tab === 'range' ? 0 : 150;
  };

  const handleRangeChange = (values: number[]) => {
    onRangeChange({
      min: values[0],
      max: values[1],
    });
  };

  const handleTimeChange = (type: 'bedtime' | 'wakeTime', time: string) => {
    if (!onScheduleChange) return;
    
    const updatedSchedule = {
      bedtime: sleepSchedule?.bedtime || '22:00',
      wakeTime: sleepSchedule?.wakeTime || '07:00',
      [type]: time,
    };
    
    onScheduleChange(updatedSchedule);
  };

  const formatHour = (hour: number): string => {
    return `${hour}h`;
  };

  const generateTimeOptions = (): string[] => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return times;
  };

  return (
    <View style={styles.container}>
      {showScheduleOption && (
        <View style={styles.tabContainer}>
          <View style={[styles.tabBackground, { backgroundColor: theme.colors.neutral[100] }]}>
            <Animated.View
              style={[
                styles.tabIndicator,
                { backgroundColor: theme.colors.primary },
                tabIndicatorStyle,
              ]}
            />
            
            <TouchableOpacity
              style={styles.tab}
              onPress={() => handleTabPress('range')}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === 'range' ? theme.colors.surface : theme.colors.text.secondary,
                    fontWeight: activeTab === 'range' ? theme.fontWeight.semibold : theme.fontWeight.normal,
                  }
                ]}
              >
                Plage
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.tab}
              onPress={() => handleTabPress('schedule')}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === 'schedule' ? theme.colors.surface : theme.colors.text.secondary,
                    fontWeight: activeTab === 'schedule' ? theme.fontWeight.semibold : theme.fontWeight.normal,
                  }
                ]}
              >
                Horaires
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.content}>
        {activeTab === 'range' ? (
          <View style={styles.rangeContainer}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Combien d'heures dormez-vous habituellement ?
            </Text>
            
            <View style={styles.rangeDisplay}>
              <Text style={[styles.rangeValue, { color: theme.colors.primary }]}>
                {formatHour(sleepRange.min)} - {formatHour(sleepRange.max)}
              </Text>
            </View>
            
            <View style={styles.sliderContainer}>
              <MultiSlider
                values={[sleepRange.min, sleepRange.max]}
                onValuesChange={handleRangeChange}
                min={4}
                max={12}
                step={0.5}
                sliderLength={300}
                selectedStyle={{ backgroundColor: theme.colors.primary }}
                unselectedStyle={{ backgroundColor: theme.colors.neutral[300] }}
                containerStyle={styles.slider}
                trackStyle={styles.track}
                markerStyle={[styles.marker, { backgroundColor: theme.colors.primary }]}
                pressedMarkerStyle={[styles.markerPressed, { backgroundColor: theme.colors.primary }]}
              />
              
              <View style={styles.sliderLabels}>
                <Text style={[styles.sliderLabel, { color: theme.colors.text.light }]}>4h</Text>
                <Text style={[styles.sliderLabel, { color: theme.colors.text.light }]}>12h</Text>
              </View>
            </View>
            
            <Text style={[styles.subtitle, { color: theme.colors.text.light }]}>
              Cette moyenne sera utilisée pour personnaliser vos recommandations
            </Text>
          </View>
        ) : (
          <View style={styles.scheduleContainer}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              À quelle heure vous couchez-vous et vous levez-vous ?
            </Text>
            
            <View style={styles.timePickerContainer}>
              <View style={styles.timePicker}>
                <Text style={[styles.timeLabel, { color: theme.colors.text.secondary }]}>
                  Coucher
                </Text>
                <TouchableOpacity
                  style={[styles.timeButton, { borderColor: theme.colors.primary }]}
                  onPress={() => {
                    // Open time picker for bedtime
                  }}
                >
                  <Text style={[styles.timeText, { color: theme.colors.primary }]}>
                    {sleepSchedule?.bedtime || '22:00'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.timePicker}>
                <Text style={[styles.timeLabel, { color: theme.colors.text.secondary }]}>
                  Lever
                </Text>
                <TouchableOpacity
                  style={[styles.timeButton, { borderColor: theme.colors.primary }]}
                  onPress={() => {
                    // Open time picker for wake time
                  }}
                >
                  <Text style={[styles.timeText, { color: theme.colors.primary }]}>
                    {sleepSchedule?.wakeTime || '07:00'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  tabContainer: {
    marginBottom: 24,
  },
  tabBackground: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 146,
    height: 40,
    borderRadius: 21,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    minHeight: 200,
  },
  rangeContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  rangeDisplay: {
    marginBottom: 32,
  },
  rangeValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  slider: {
    height: 40,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerPressed: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    paddingHorizontal: 12,
  },
  sliderLabel: {
    fontSize: 12,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  scheduleContainer: {
    alignItems: 'center',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 32,
  },
  timePicker: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  timeButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '600',
  },
});