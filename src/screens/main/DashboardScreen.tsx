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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const W = screenWidth - 40; // Largeur pleine écran avec marges

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

  // État pour les progressions
  const [waterProgress, setWaterProgress] = useState(23); // 23% comme dans l'image
  const [streakProgress, setStreakProgress] = useState(15); // Exemple

  // Fonction pour simuler la progression quand on accomplit une tâche
  const completeTask = () => {
    setWaterProgress(prev => Math.min(prev + 5, 100)); // +5% pour l'eau
    Alert.alert('Objectif accompli!', `Progression eau: ${Math.min(waterProgress + 5, 100)}%`);
  };

  const renderWeekDaysOverlay = () => {
    const sectionHeight = (screenWidth - 40) * (435.91 / 1099.06);
    const dayWidth = (screenWidth - 40) * 0.13;
    const startX = (screenWidth - 40) * 0.095;
    const dayY = sectionHeight * 0.65;
    
    return (
      <View style={[styles.weekOverlay, { height: sectionHeight }]}>
        {weekDays.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayContainer,
              {
                left: startX + (index * dayWidth),
                top: dayY,
                width: dayWidth,
              }
            ]}
          >
            <Text style={[
              styles.dayText,
              day.isToday && styles.todayDayText
            ]}>
              {day.dayName}
            </Text>
            <Text style={[
              styles.dayNumber,
              day.isToday && styles.todayDayNumber
            ]}>
              {day.dayNumber}
            </Text>
          </View>
        ))}
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
    return (
      <View style={styles.levelContainer}>
        <Image 
          source={require('../../../assets/ui/Nutrition/Level_Progress.png')}
          style={{ width: screenWidth - 40, height: undefined, aspectRatio: 1099.06 / 435.91 }}
          resizeMode="contain"
        />
        <View style={styles.progressOverlay}>
          <Image 
            source={getProgressBarSource(waterProgress)}
            style={{ width: screenWidth - 40, height: undefined, aspectRatio: 1099.06 / 435.91 }}
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

  const renderPageIndicator = () => (
    <View style={styles.pageIndicator}>
      {[0, 1].map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.dot,
            {
              backgroundColor: currentPage === page ? '#1f2233' : '#414460',
            }
          ]}
          onPress={() => handlePageChange(page)}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentPage(page);
        }}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        {/* Page 1 - PROGRAMME */}
        <View style={styles.pageContainer}>
          <View style={styles.pageContent}>
            {/* Widget Semaine */}
            <TouchableOpacity style={styles.topWidget}>
              <View style={styles.semaineContainer}>
                <Image 
                  source={require('../../../assets/ui/Programme/Section_Semaine.png')}
                  style={{ width: screenWidth - 40, height: undefined, aspectRatio: 1099.06 / 435.91 }}
                  resizeMode="contain"
                />
                {renderWeekDaysOverlay()}
              </View>
            </TouchableOpacity>

            {/* Button Générer le programme */}
            <Pressable
              style={styles.middleButton}
              onPress={() => Alert.alert('Génération', 'Génération du programme en cours...')}
            >
              {({ pressed }) => (
                <Image 
                  source={pressed 
                    ? require('../../../assets/ui/Programme/Button_ProgrammeAI_press.png')
                    : require('../../../assets/ui/Programme/Button_ProgrammeAI.png')
                  }
                  style={{ width: screenWidth - 40, height: undefined, aspectRatio: 1099.06 / 233.21 }}
                  resizeMode="contain"
                />
              )}
            </Pressable>

            {/* Card Voir le programme */}
            <Pressable
              style={styles.bottomCard}
              onPress={() => Alert.alert('Programme', 'Navigation vers le programme')}
            >
              {({ pressed }) => (
                <Image 
                  source={pressed 
                    ? require('../../../assets/ui/Programme/Card_Programme_press.png')
                    : require('../../../assets/ui/Programme/Card_Programme.png')
                  }
                  style={{ width: screenWidth - 40, height: undefined, aspectRatio: 1099.06 / 1384.51 }}
                  resizeMode="contain"
                />
              )}
            </Pressable>
          </View>
        </View>
        
        {/* Page 2 - NUTRITION */}
        <View style={styles.pageContainer}>
          <View style={styles.pageContent}>
            {/* Widget Level 2 */}
            <TouchableOpacity style={styles.topWidget} onPress={completeTask}>
              {renderLevelProgress()}
            </TouchableOpacity>

            {/* Button Analyser mon repas */}
            <Pressable
              style={styles.middleButton}
              onPress={() => Alert.alert('Scanner', 'Ouverture du scanner')}
            >
              {({ pressed }) => (
                <Image 
                  source={pressed 
                    ? require('../../../assets/ui/Nutrition/Button_Scan_Press.png')
                    : require('../../../assets/ui/Nutrition/Button_Scan.png')
                  }
                  style={{ width: screenWidth - 40, height: undefined, aspectRatio: 1099.06 / 233.21 }}
                  resizeMode="contain"
                />
              )}
            </Pressable>

            {/* Card C'est l'heure du repas */}
            <Pressable
              style={styles.bottomCard}
              onPress={() => Alert.alert('Repas', 'Navigation vers les repas')}
            >
              {({ pressed }) => (
                <Image 
                  source={pressed 
                    ? require('../../../assets/ui/Nutrition/Card_Repas_Press.png')
                    : require('../../../assets/ui/Nutrition/Card_Repas.png')
                  }
                  style={{ width: screenWidth - 40, height: undefined, aspectRatio: 1099.06 / 1384.51 }}
                  resizeMode="contain"
                />
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
      
      {/* Page Indicator */}
      {renderPageIndicator()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Safe area top
    paddingBottom: 85, // Tab bar height
  },
  horizontalScrollContent: {
    flexDirection: 'row',
  },
  pageContainer: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  // Contenu de chaque page
  pageContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    paddingBottom: 60, // Espace pour les boutons de slide (réduit car on a déjà le padding du container)
  },
  
  // Widget du haut
  topWidget: {
    alignItems: 'center',
    marginBottom: 12,
  },
  
  // Bouton du milieu
  middleButton: {
    alignItems: 'center',
    marginBottom: 12,
  },
  
  // Grande carte du bas
  bottomCard: {
    alignItems: 'center',
    marginBottom: 12, // Même écart que les autres éléments
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
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  dayText: {
    color: '#faece3',
    fontSize: 8,
    fontWeight: '600',
    marginBottom: 1,
  },
  
  dayNumber: {
    color: '#faece3',
    fontSize: 10,
    fontWeight: '700',
  },
  
  todayDayText: {
    color: '#1f2233',
  },
  
  todayDayNumber: {
    color: '#1f2233',
  },

  // Page Indicator
  pageIndicator: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});