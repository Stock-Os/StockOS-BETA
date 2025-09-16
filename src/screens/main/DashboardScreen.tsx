import React, { useState, useRef, useEffect } from 'react';
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
import { Gyroscope } from 'expo-sensors';
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


export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { userData } = useUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Parallax gyroscope effect
  const cardRotateX = useRef(new Animated.Value(0)).current;
  const cardRotateY = useRef(new Animated.Value(0)).current;
  const cardRotateZ = useRef(new Animated.Value(0)).current;
  const cardRotation3D = useRef(new Animated.Value(0)).current;

  // Smoothing variables
  const smoothX = useRef(0);
  const smoothY = useRef(0);

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

  // Gyroscope parallax effect
  useEffect(() => {
    let subscription: any;

    const setupGyroscope = async () => {
      try {
        const result = await Gyroscope.isAvailableAsync();
        console.log('Gyroscope available:', result);

        if (result) {
          Gyroscope.setUpdateInterval(100);
          subscription = Gyroscope.addListener(({ x, y, z }) => {
            // Seuil de déclenchement - ne réagit qu'aux mouvements plus prononcés
            const threshold = 0.3;
            if (Math.abs(x) < threshold && Math.abs(y) < threshold) {
              return;
            }

            // Smoothing avec interpolation linéaire (lerp)
            const smoothingFactor = 0.1; // Plus c'est bas, plus c'est smooth
            smoothX.current = smoothX.current + (x - smoothX.current) * smoothingFactor;
            smoothY.current = smoothY.current + (y - smoothY.current) * smoothingFactor;

            // Ajustement pour rendre l'effet plus visible
            const maxMovement = 8; // Augmenté pour plus de visibilité
            const sensitivity = 15; // Plus sensible pour être visible
            const maxRotation = 1.5; // Maximum 1.5 degrés de rotation

            // Correction des axes pour correspondre à l'orientation naturelle
            const translateX = Math.max(-maxMovement, Math.min(maxMovement, smoothY.current * sensitivity));
            const translateY = Math.max(-maxMovement, Math.min(maxMovement, smoothX.current * sensitivity));

            // Rotation pour l'effet de distortion (axes corrigés)
            const rotateZ = Math.max(-maxRotation, Math.min(maxRotation, smoothY.current * 3));
            const rotateX = Math.max(-maxRotation, Math.min(maxRotation, smoothX.current * 3));

            // Animation très douce avec rotations
            Animated.parallel([
              Animated.timing(cardRotateX, {
                toValue: translateY,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(cardRotateY, {
                toValue: translateX,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(cardRotateZ, {
                toValue: rotateZ,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(cardRotation3D, {
                toValue: rotateX,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start();
          });
        } else {
          console.log('Gyroscope not available');
        }
      } catch (error) {
        console.log('Gyroscope error:', error);
      }
    };

    setupGyroscope();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [cardRotateX, cardRotateY, cardRotateZ, cardRotation3D]);

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
    inputRange: [-screenWidth, 0, screenWidth],
    outputRange: [screenWidth, 0, -screenWidth],
    extrapolate: 'clamp',
  });
  const middleButtonTranslateX = scrollX.interpolate({
    inputRange: [-screenWidth, -screenWidth * 0.66, 0, screenWidth * 0.33, screenWidth],
    outputRange: [screenWidth, screenWidth, 0, 0, -screenWidth], // Animation inversée à gauche
    extrapolate: 'clamp',
  });
  const topWidgetTranslateX = scrollX.interpolate({
    inputRange: [-screenWidth, -screenWidth * 0.33, 0, screenWidth * 0.66, screenWidth],
    outputRange: [screenWidth, screenWidth, 0, 0, -screenWidth], // Animation inversée à gauche
    extrapolate: 'clamp',
  });

  // Page Nutrition - entrée séquentielle : CARD (0-100%) → BOUTON (33-100%) → SECTION (66-100%)
  const nutritionCardTranslateX = scrollX.interpolate({
    inputRange: [-screenWidth, 0, screenWidth],
    outputRange: [0, screenWidth, 0],
    extrapolate: 'clamp',
  });
  const nutritionButtonTranslateX = scrollX.interpolate({
    inputRange: [-screenWidth, -screenWidth * 0.33, 0, screenWidth * 0.33, screenWidth],
    outputRange: [0, -screenWidth, screenWidth, screenWidth, 0], // Animation inversée à gauche
    extrapolate: 'clamp',
  });
  const nutritionTopWidgetTranslateX = scrollX.interpolate({
    inputRange: [-screenWidth, -screenWidth * 0.66, 0, screenWidth * 0.66, screenWidth],
    outputRange: [0, -screenWidth, screenWidth, screenWidth, 0], // Animation inversée à gauche
    extrapolate: 'clamp',
  });

  // État pour les progressions
  const [waterProgress, setWaterProgress] = useState(0); // Commence à 0%
  const [streakProgress, setStreakProgress] = useState(0); // Commence à 0

  // Fonction pour simuler la progression quand on accomplit une tâche
  const completeTask = () => {
    const newWaterProgress = waterProgress + 5; // Réduction à 5% pour utiliser toutes les barres
    if (newWaterProgress >= 100) {
      // Quand on atteint 100%, on remet à 0% et on augmente la streak
      setWaterProgress(0);
      setStreakProgress(prev => prev + 1);
    } else {
      setWaterProgress(newWaterProgress);
    }
  };


  const getProgressBarSource = (progress: number) => {
    if (progress === 0) return require('../../../assets/ui/Widget/Progressbar_0-5%.png');
    if (progress === 5) return require('../../../assets/ui/Widget/Progressbar_5-10%.png');
    if (progress === 10) return require('../../../assets/ui/Widget/Progressbar 10-15%.png');
    if (progress === 15) return require('../../../assets/ui/Widget/Progressbar 15-20%.png');
    if (progress === 20) return require('../../../assets/ui/Widget/Progressbar 20-25%.png');
    if (progress === 25) return require('../../../assets/ui/Widget/Progressbar 25-30%.png');
    if (progress === 30) return require('../../../assets/ui/Widget/Progressbar 30-35%.png');
    if (progress === 35) return require('../../../assets/ui/Widget/Progressbar 35-40%.png');
    if (progress === 40) return require('../../../assets/ui/Widget/Progressbar 40-45%.png');
    if (progress === 45) return require('../../../assets/ui/Widget/Progressbar 45-50%.png');
    if (progress === 50) return require('../../../assets/ui/Widget/Progressbar 50-55%.png');
    if (progress === 55) return require('../../../assets/ui/Widget/Progressbar 55-60%.png');
    if (progress === 60) return require('../../../assets/ui/Widget/Progressbar 60-65%.png');
    if (progress === 65) return require('../../../assets/ui/Widget/Progressbar 65-70%.png');
    if (progress === 70) return require('../../../assets/ui/Widget/Progressbar 70-75%.png');
    if (progress === 75) return require('../../../assets/ui/Widget/Progressbar 75-80%.png');
    if (progress === 80) return require('../../../assets/ui/Widget/Progressbar 80-85%.png');
    if (progress === 85) return require('../../../assets/ui/Widget/Progressbar 85-90%.png');
    if (progress === 90) return require('../../../assets/ui/Widget/Progressbar 85-90%_1.png');
    if (progress === 95) return require('../../../assets/ui/Widget/Progressbar 95-100%.png');
    return require('../../../assets/ui/Widget/Progressbar 95-100%.png');
  };
  
  const getStreakProgressSource = (streak: number) => {
    // Utilisation de toutes les barres streak progressivement (cycle de 11 étapes)
    const streakStep = streak % 11;
    if (streakStep === 0) return require('../../../assets/ui/Widget/Streak_progress_0-5%.png');
    if (streakStep === 1) return require('../../../assets/ui/Widget/Streak_progress_5-10%.png');
    if (streakStep === 2) return require('../../../assets/ui/Widget/Streak_progress_10-20%.png');
    if (streakStep === 3) return require('../../../assets/ui/Widget/Streak_progress_20-30%.png');
    if (streakStep === 4) return require('../../../assets/ui/Widget/Streak_progress_30-40%.png');
    if (streakStep === 5) return require('../../../assets/ui/Widget/Streak_progress_40-50%.png');
    if (streakStep === 6) return require('../../../assets/ui/Widget/Streak_progress_50-60%.png');
    if (streakStep === 7) return require('../../../assets/ui/Widget/Streak_progress_60-70%.png');
    if (streakStep === 8) return require('../../../assets/ui/Widget/Streak_progress_70-80%.png');
    if (streakStep === 9) return require('../../../assets/ui/Widget/Streak_progress_80-90%.png');
    return require('../../../assets/ui/Widget/Streak_progress_90-100%.png'); // streakStep === 10
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
          {/* Streak progress overlay */}
          <Image 
            source={getStreakProgressSource(streakProgress)}
            style={{ width: scaledWidth, height: undefined, aspectRatio: 1099.06 / 435.91, position: 'absolute', top: 0 }}
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
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
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
        contentContainerStyle={[styles.horizontalScrollContent, { backgroundColor: 'transparent' }]}
        style={{ backgroundColor: 'transparent' }}
        scrollEventThrottle={16}
      >
        {/* Page 1 - PROGRAMME */}
        <View style={[styles.pageContainer, { backgroundColor: 'transparent' }]}>
          <View style={styles.pageContent}>
            {/* Header selon référence */}
            <View style={styles.header}>
              {/* Stats avec widgets et avatar */}
              <View style={styles.profileStats}>
                <View style={styles.leftWidget}>
                  <Image
                    source={require('../../../assets/ui/Programme/Widget_Profile-Left_StockOS.png')}
                    style={styles.widgetImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.profileCenter}>
                  <Image
                    source={require('../../../assets/ui/Programme/Avatar_StockOS.png')}
                    style={styles.avatarImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.rightWidget}>
                  <Image
                    source={require('../../../assets/ui/Programme/Widget_Profile-Right_StockOS.png')}
                    style={styles.widgetImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>

            {/* Button Générer le programme */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => Alert.alert('Génération', 'Génération du programme en cours...')}
            >
              <Image
                source={require('../../../assets/ui/Programme/Button_StockOS.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Card Voir le programme avec effet parallaxe et rotation */}
            <Animated.View
              style={[
                styles.cardContainer,
                {
                  transform: [
                    {
                      translateX: cardRotateY,
                    },
                    {
                      translateY: cardRotateX,
                    },
                    {
                      rotateZ: cardRotateZ.interpolate({
                        inputRange: [-1.5, 1.5],
                        outputRange: ['-1.5deg', '1.5deg'],
                      }),
                    },
                    {
                      rotateX: cardRotation3D.interpolate({
                        inputRange: [-1.5, 1.5],
                        outputRange: ['-1.5deg', '1.5deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => Alert.alert('Programme', 'Navigation vers le programme')}
              >
                <Image
                  source={require('../../../assets/ui/Programme/Card_StockOS.png')}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
        
        {/* Page 2 - NUTRITION */}
        <View style={[styles.pageContainer, { backgroundColor: 'transparent' }]}>
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
    paddingTop: 0,
    paddingBottom: 0,
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
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 85,
  },
  
  // Widget du haut
  topWidget: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Bouton du milieu
  middleButton: {
    marginBottom: 32,
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

  // Header styles
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  headerTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 10,
  },

  topButton: {
    padding: 5,
  },

  topIcon: {
    width: 45,
    height: 45,
  },

  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },

  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 5,
    marginTop: 25,
  },

  leftWidget: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 20,
  },

  rightWidget: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20,
  },

  profileCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: -35,
  },

  widgetImage: {
    width: 160,
    height: 160,
  },

  avatarImage: {
    width: 110,
    height: 110,
  },

  // Button StockOS styles
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    marginBottom: 15,
  },

  buttonImage: {
    width: screenWidth * 0.9,
    height: undefined,
    aspectRatio: 1099.06 / 233.21,
  },

  // Card StockOS styles
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImage: {
    width: screenWidth * 0.9,
    height: undefined,
    aspectRatio: 1099.06 / 1384.51,
  },

});