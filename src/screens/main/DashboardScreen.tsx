import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Pressable,
  Animated,
  PixelRatio,
  Platform,
} from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();

// iPhone 13 Pro Max dimensions (référence parfaite)
const REFERENCE_WIDTH = 428;
const REFERENCE_HEIGHT = 926;

// Calcul des facteurs d'échelle basés sur l'iPhone 13 Pro Max
const widthScale = screenWidth / REFERENCE_WIDTH;
const heightScale = screenHeight / REFERENCE_HEIGHT;
const scale = Math.min(widthScale, heightScale);

// Fonction pour adapter les dimensions
const scaleSize = (size: number) => Math.round(size * scale);
const scaleFontSize = (size: number) => Math.round((size * scale) / fontScale);

const W = screenWidth - scaleSize(40); // Largeur pleine écran avec marges
const SCALE_FACTOR = 0.95; // Facteur de réduction pour laisser place au slider

// Fonction pour obtenir les jours de la semaine
const getDaysOfWeek = () => {
  const today = new Date();
  const weekDays = [];
  
  // Créer 7 jours avec aujourd'hui au centre (position 3)
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayIndex = date.getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Dimanche = 6, Lundi = 0
    weekDays.push({
      dayName: ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'][adjustedIndex],
      dayNumber: date.getDate(),
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  return weekDays;
};

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { userData } = useUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const weekDays = getDaysOfWeek();

  const [fontsLoaded] = useFonts({
    'WisterDemo': Platform.OS === 'android' 
      ? require('../../../assets/fonts/Wister-Demo.otf')
      : require('../../../assets/fonts/Wister-Demo.ttf'),
    'Wister-Demo': require('../../../assets/fonts/Wister-Demo.otf'), // Android OTF
  });

  // Debug: Log font loading status
  React.useEffect(() => {
    console.log('Fonts loaded:', fontsLoaded, 'Platform:', Platform.OS);
  }, [fontsLoaded]);

  // Force font family based on platform and font loading
  const getFontFamily = () => {
    if (!fontsLoaded) return Platform.OS === 'ios' ? 'System' : 'Roboto';
    return Platform.OS === 'android' ? 'Wister-Demo' : 'WisterDemo';
  };

  // Component Text personnalisé pour forcer la police sur Android
  const CustomText = ({ children, style, ...props }) => {
    return (
      <Text
        {...props}
        style={[
          style,
          Platform.OS === 'android' && {
            fontFamily: 'Wister-Demo',
            textAlign: 'center',
            textAlignVertical: 'center',
          }
        ]}
        allowFontScaling={false}
      >
        {children}
      </Text>
    );
  };

  // Animations SÉQUENTIELLES PENDANT LE SLIDE
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // SLIDE VERS LA DROITE (Programme → Nutrition)
  // Page Programme - sortie séquentielle : CARD (0-100%) → BOUTON (33-100%) → SECTION (66-100%)
  const cardTranslateX = scrollX.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [0, -screenWidth],
    extrapolate: 'clamp',
  });
  const middleButtonTranslateX = scrollX.interpolate({
    inputRange: [0, screenWidth * 0.33, screenWidth],
    outputRange: [0, 0, -screenWidth], // Reste figé jusqu'à 33%
    extrapolate: 'clamp',
  });
  const topWidgetTranslateX = scrollX.interpolate({
    inputRange: [0, screenWidth * 0.66, screenWidth],
    outputRange: [0, 0, -screenWidth], // Reste figé jusqu'à 66%
    extrapolate: 'clamp',
  });

  // Page Nutrition - entrée séquentielle : CARD (0-100%) → BOUTON (33-100%) → SECTION (66-100%)
  const nutritionCardTranslateX = scrollX.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [screenWidth, 0],
    extrapolate: 'clamp',
  });
  const nutritionButtonTranslateX = scrollX.interpolate({
    inputRange: [0, screenWidth * 0.33, screenWidth],
    outputRange: [screenWidth, screenWidth, 0], // Reste hors écran jusqu'à 33%
    extrapolate: 'clamp',
  });
  const nutritionTopWidgetTranslateX = scrollX.interpolate({
    inputRange: [0, screenWidth * 0.66, screenWidth],
    outputRange: [screenWidth, screenWidth, 0], // Reste hors écran jusqu'à 66%
    extrapolate: 'clamp',
  });

  // État pour les progressions
  const [waterProgress, setWaterProgress] = useState(23); // 23% comme dans l'image
  const [streakProgress, setStreakProgress] = useState(15); // Exemple

  // Fonction pour simuler la progression quand on accomplit une tâche
  const completeTask = () => {
    setWaterProgress(prev => Math.min(prev + 5, 100)); // +5% pour l'eau
    Alert.alert('Objectif accompli!', `Progression eau: ${Math.min(waterProgress + 5, 100)}%`);
  };

  const renderWeekDaysOverlay = () => {
    const scaledWidth = W * SCALE_FACTOR;
    const sectionHeight = scaledWidth * (435.91 / 1099.06);
    const dayWidth = scaledWidth * 0.13;
    const startX = 0; // Start from 0 to center on section
    const dayY = sectionHeight * 0.55;
    
    return (
      <View style={[styles.weekOverlay, { height: sectionHeight }]}>
        <View style={[styles.weekDaysContainer, { width: scaledWidth }]}>
          {weekDays.map((day, index) => (
            <View
              key={index}
              style={[
                styles.dayContainer,
                {
                  flex: 1,
                  top: dayY,
                }
              ]}
            >
              <CustomText style={[
                styles.dayText,
                day.isToday && styles.todayDayText,
                { fontFamily: getFontFamily() } // Force explicite multi-platform
              ]}>
                {day.dayName}
              </CustomText>
              <CustomText style={[
                styles.dayNumber,
                day.isToday && styles.todayDayNumber,
                { fontFamily: getFontFamily() } // Force explicite multi-platform
              ]}>
                {String(day.dayNumber)}
              </CustomText>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const getProgressBarSource = (progress: number) => {
    if (progress <= 5) return require('../../../assets/ui/Widget/Progressbar_0-5%.png');
    if (progress <= 10) return require('../../../assets/ui/Widget/Progressbar_5-10%.png');
    if (progress <= 15) return require('../../../assets/ui/Widget/Progressbar 10-15%.png');
    if (progress <= 20) return require('../../../assets/ui/Widget/Progressbar 15-20%.png');
    if (progress <= 25) return require('../../../assets/ui/Widget/Progressbar 20-25%.png');
    if (progress <= 30) return require('../../../assets/ui/Widget/Progressbar 25-30%.png');
    if (progress <= 35) return require('../../../assets/ui/Widget/Progressbar 30-35%.png');
    if (progress <= 40) return require('../../../assets/ui/Widget/Progressbar 35-40%.png');
    if (progress <= 45) return require('../../../assets/ui/Widget/Progressbar 40-45%.png');
    if (progress <= 50) return require('../../../assets/ui/Widget/Progressbar 45-50%.png');
    if (progress <= 55) return require('../../../assets/ui/Widget/Progressbar 50-55%.png');
    if (progress <= 60) return require('../../../assets/ui/Widget/Progressbar 55-60%.png');
    if (progress <= 65) return require('../../../assets/ui/Widget/Progressbar 60-65%.png');
    if (progress <= 70) return require('../../../assets/ui/Widget/Progressbar 65-70%.png');
    if (progress <= 75) return require('../../../assets/ui/Widget/Progressbar 70-75%.png');
    if (progress <= 80) return require('../../../assets/ui/Widget/Progressbar 75-80%.png');
    if (progress <= 85) return require('../../../assets/ui/Widget/Progressbar 80-85%.png');
    if (progress <= 90) return require('../../../assets/ui/Widget/Progressbar 85-90%.png');
    if (progress <= 95) return require('../../../assets/ui/Widget/Progressbar 85-90%_1.png');
    return require('../../../assets/ui/Widget/Progressbar 95-100%.png');
  };

  const renderLevelProgress = () => {
    const scaledWidth = W * SCALE_FACTOR;
    return (
      <View style={[styles.levelContainer, { width: scaledWidth, alignSelf: 'center' }]}>
        <Image 
          source={require('../../../assets/ui/Nutrition/Level_Progress.png')}
          style={{ width: scaledWidth, height: undefined, aspectRatio: 1099.06 / 435.91 }}
          resizeMode="contain"
        />
        <View style={styles.progressOverlay}>
          <Image 
            source={getProgressBarSource(waterProgress)}
            style={{ width: scaledWidth, height: undefined, aspectRatio: 1099.06 / 435.91 }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollViewRef.current?.scrollTo({
      x: page * screenWidth,
      animated: true,
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.ScrollView 
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentPage(page);
        }}
        contentContainerStyle={[styles.horizontalScrollContent, { backgroundColor: theme.colors.background }]}
        style={{ backgroundColor: theme.colors.background }}
        scrollEventThrottle={16}
      >
        {/* Page 1 - PROGRAMME */}
        <View style={[styles.pageContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.pageContent}>
            {/* Widget Semaine */}
            <Animated.View style={[{ transform: [{ translateX: topWidgetTranslateX }] }]}>
              <TouchableOpacity style={[styles.topWidget, { width: W * SCALE_FACTOR, alignSelf: 'center' }]}>
              <View style={[styles.semaineContainer, { width: W * SCALE_FACTOR, alignSelf: 'center' }]}>
                <Image 
                  source={require('../../../assets/ui/Programme/Section_Semaine.png')}
                  style={{ width: W * SCALE_FACTOR, height: undefined, aspectRatio: 1099.06 / 435.91 }}
                  resizeMode="contain"
                />
                {renderWeekDaysOverlay()}
              </View>
            </TouchableOpacity>
            </Animated.View>

            {/* Button Générer le programme */}
            <Animated.View style={[{ transform: [{ translateX: middleButtonTranslateX }] }]}>
              <Pressable
                style={[styles.middleButton, { width: W * SCALE_FACTOR, alignSelf: 'center' }]}
                onPress={() => Alert.alert('Génération', 'Génération du programme en cours...')}
              >
              {({ pressed }) => (
                <Image 
                  source={pressed 
                    ? require('../../../assets/ui/Programme/Button_ProgrammeAI_press.png')
                    : require('../../../assets/ui/Programme/Button_ProgrammeAI.png')
                  }
                  style={{ width: W * SCALE_FACTOR, height: undefined, aspectRatio: 1099.06 / 233.21 }}
                  resizeMode="contain"
                />
              )}
            </Pressable>
            </Animated.View>

            {/* Card Voir le programme */}
            <Animated.View style={[{ alignItems: 'center', marginBottom: 12 }, { transform: [{ translateX: cardTranslateX }] }]}>
              <Pressable
                onPress={() => Alert.alert('Programme', 'Navigation vers le programme')}
              >
                {({ pressed }) => (
                  <Image 
                    source={pressed 
                      ? require('../../../assets/ui/Programme/Card_Programme_press.png')
                      : require('../../../assets/ui/Programme/Card_Programme.png')
                    }
                    style={{ width: W, height: undefined, aspectRatio: 1099.06 / 1384.51 }}
                    resizeMode="contain"
                  />
                )}
              </Pressable>
            </Animated.View>
          </View>
        </View>
        
        {/* Page 2 - NUTRITION */}
        <View style={[styles.pageContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.pageContent}>
            {/* Widget Level 2 */}
            <Animated.View style={[{ transform: [{ translateX: nutritionTopWidgetTranslateX }] }]}>
              <TouchableOpacity style={[styles.topWidget, { width: W * SCALE_FACTOR, alignSelf: 'center' }]} onPress={completeTask}>
              {renderLevelProgress()}
            </TouchableOpacity>
            </Animated.View>

            {/* Button Analyser mon repas */}
            <Animated.View style={[{ transform: [{ translateX: nutritionButtonTranslateX }] }]}>
              <Pressable
                style={[styles.middleButton, { width: W * SCALE_FACTOR, alignSelf: 'center' }]}
                onPress={() => Alert.alert('Scanner', 'Ouverture du scanner')}
              >
              {({ pressed }) => (
                <Image 
                  source={pressed 
                    ? require('../../../assets/ui/Nutrition/Button_Scan_Press.png')
                    : require('../../../assets/ui/Nutrition/Button_Scan.png')
                  }
                  style={{ width: W * SCALE_FACTOR, height: undefined, aspectRatio: 1099.06 / 233.21 }}
                  resizeMode="contain"
                />
              )}
            </Pressable>
            </Animated.View>

            {/* Card C'est l'heure du repas */}
            <Animated.View style={[{ alignItems: 'center', marginBottom: 12 }, { transform: [{ translateX: nutritionCardTranslateX }] }]}>
              <Pressable
                onPress={() => Alert.alert('Repas', 'Navigation vers les repas')}
              >
                {({ pressed }) => (
                  <Image 
                    source={pressed 
                      ? require('../../../assets/ui/Nutrition/Card_Repas_Press.png')
                      : require('../../../assets/ui/Nutrition/Card_Repas.png')
                    }
                    style={{ width: W, height: undefined, aspectRatio: 1099.06 / 1384.51 }}
                    resizeMode="contain"
                  />
                )}
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </Animated.ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scaleSize(50), // Safe area top
    paddingBottom: 0, // Pas de padding bottom, laissons la tab bar gérer l'espace
  },
  horizontalScrollContent: {
    flexDirection: 'row',
  },
  pageContainer: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(20),
  },
  
  // Contenu de chaque page
  pageContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scaleSize(20),
    paddingBottom: scaleSize(160), // Plus d'espace pour les boutons de slide
  },
  
  // Widget du haut
  topWidget: {
    marginBottom: scaleSize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Bouton du milieu
  middleButton: {
    marginBottom: scaleSize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  
  // Level progress container
  levelContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  progressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  semaineContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  weekOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  weekDaysContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingHorizontal: scaleSize(25),
  },
  
  dayText: {
    color: '#faece3',
    fontSize: scaleFontSize(10),
    fontWeight: '600',
    marginBottom: scaleSize(2),
    fontFamily: Platform.OS === 'android' ? 'Wister-Demo' : 'WisterDemo',
  },
  
  dayNumber: {
    color: '#faece3',
    fontSize: scaleFontSize(18),
    fontWeight: '700',
    fontFamily: Platform.OS === 'android' ? 'Wister-Demo' : 'WisterDemo',
  },
  
  todayDayText: {
    color: '#1f2233',
  },
  
  todayDayNumber: {
    color: '#1f2233',
  },

});