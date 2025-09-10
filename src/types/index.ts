// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  isPremium: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Onboarding Types
export interface OnboardingData {
  // Personal Info
  name: string;
  
  // Goals and Activity
  mainGoal: MainGoal;
  activityLevel: ActivityLevel;
  progressionRhythm: ProgressionRhythm;
  programWeeks: number;
  
  // Physical Measurements
  height: number; // cm
  currentWeight: number; // kg
  minWeight: number;
  maxWeight: number;
  targetWeight: number;
  bodyFatPercentage: BodyFatLevel;
  
  // Experience and Training
  experienceLevel: ExperienceLevel;
  injuries: InjuryZone[];
  preferredTrainingTypes: TrainingType[];
  sessionsPerWeek: number;
  sessionDuration: SessionDuration;
  trainingLocation: TrainingLocation;
  availableEquipment: Equipment[];
  restDays: WeekDay[];
  
  // Nutrition
  mealsPerDay: number;
  proteinGoal: ProteinGoal;
  carbFatPreference: CarbFatPreference;
  cookingTime: CookingTime;
  allergies: string[];
  dietaryRestrictions: string[];
  
  // Lifestyle
  sleepRange: SleepRange;
  sleepSchedule?: SleepSchedule;
  stressLevel: StressLevel;
  hydrationGoal: number; // L/day
  stepsGoal: number; // steps/day
}

export type MainGoal = 
  | 'weight_loss'
  | 'muscle_gain' 
  | 'body_recomposition'
  | 'performance'
  | 'fitness';

export type ActivityLevel = 
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active';

export type ProgressionRhythm = 
  | 'slow'
  | 'moderate'
  | 'fast'
  | 'very_fast';

export type BodyFatLevel = 
  | 'very_low'
  | 'low'
  | 'normal'
  | 'high'
  | 'very_high'
  | 'obese'
  | 'extremely_obese_1'
  | 'extremely_obese_2'
  | 'extremely_obese_3';

export type ExperienceLevel = 
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export type InjuryZone = 
  | 'neck'
  | 'shoulder'
  | 'back'
  | 'elbow'
  | 'wrist'
  | 'hip'
  | 'knee'
  | 'ankle'
  | 'other';

export type TrainingType = 
  | 'powerlifting'
  | 'bodybuilding'
  | 'calisthenics'
  | 'weightlifting'
  | 'crossfit'
  | 'strongman'
  | 'endurance'
  | 'hiit'
  | 'functional'
  | 'rehabilitation';

export type SessionDuration = 
  | '30min'
  | '45min'
  | '60min'
  | '90min'
  | '120min';

export type TrainingLocation = 
  | 'gym'
  | 'home'
  | 'outdoor'
  | 'mixed';

export type Equipment = 
  | 'dumbbells'
  | 'barbell'
  | 'resistance_bands'
  | 'pull_up_bar'
  | 'kettlebells'
  | 'bodyweight_only'
  | 'full_gym'
  | 'cardio_machines';

export type WeekDay = 
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type ProteinGoal = 
  | 'low'
  | 'moderate'
  | 'high'
  | 'very_high';

export type CarbFatPreference = 
  | 'high_carb'
  | 'balanced'
  | 'high_fat';

export type CookingTime = 
  | '15min'
  | '30min'
  | '45min'
  | '60min_plus';

export interface SleepRange {
  min: number; // hours
  max: number; // hours
}

export interface SleepSchedule {
  bedtime: string; // HH:MM
  wakeTime: string; // HH:MM
}

export type StressLevel = 
  | 'very_low'
  | 'low'
  | 'moderate'
  | 'high'
  | 'very_high';

// Program and Workout Types
export interface WorkoutProgram {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // weeks
  difficulty: ExperienceLevel;
  workouts: Workout[];
  createdAt: string;
  isActive: boolean;
}

export interface Workout {
  id: string;
  name: string;
  day: WeekDay;
  exercises: Exercise[];
  estimatedDuration: number; // minutes
  completed: boolean;
  completedAt?: string;
}

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  sets: ExerciseSet[];
  instructions: string[];
  videoUrl?: string;
  isFavorite: boolean;
  muscleGroups: MuscleGroup[];
}

export interface ExerciseSet {
  id: string;
  reps?: number;
  weight?: number;
  duration?: number; // seconds
  distance?: number; // meters
  completed: boolean;
  restTime: number; // seconds
}

export type ExerciseType = 
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'balance'
  | 'plyometric';

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'core'
  | 'glutes'
  | 'quadriceps'
  | 'hamstrings'
  | 'calves'
  | 'full_body';

// Nutrition Types
export interface NutritionPlan {
  id: string;
  userId: string;
  weekStartDate: string;
  dailyMeals: DailyMeals[];
  totalCalories: number;
  macros: MacroDistribution;
}

export interface DailyMeals {
  date: string;
  meals: Meal[];
  totalCalories: number;
  macros: MacroDistribution;
}

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  foods: Food[];
  calories: number;
  macros: MacroDistribution;
  preparationTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  recipe?: Recipe;
}

export type MealType = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack';

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  macros: MacroDistribution;
}

export interface MacroDistribution {
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

export interface Recipe {
  id: string;
  ingredients: Ingredient[];
  instructions: string[];
  preparationTime: number;
  cookingTime: number;
  servings: number;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

// Statistics and Progress Types
export interface UserStats {
  userId: string;
  weight: WeightEntry[];
  measurements: BodyMeasurement[];
  workoutHistory: CompletedWorkout[];
  nutritionHistory: NutritionEntry[];
  progressPhotos: ProgressPhoto[];
}

export interface WeightEntry {
  id: string;
  weight: number;
  date: string;
  notes?: string;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    bicep?: number;
    thigh?: number;
  };
}

export interface CompletedWorkout {
  id: string;
  workoutId: string;
  completedAt: string;
  duration: number; // minutes
  totalVolume: number; // kg
  exercises: CompletedExercise[];
}

export interface CompletedExercise {
  exerciseId: string;
  sets: CompletedSet[];
}

export interface CompletedSet {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
  completedAt: string;
}

export interface NutritionEntry {
  id: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
  macros: MacroDistribution;
  adherenceScore: number; // 0-100
}

export interface ProgressPhoto {
  id: string;
  uri: string;
  date: string;
  angle: 'front' | 'side' | 'back';
  notes?: string;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
  ProgramGeneration: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type OnboardingStackParamList = {
  Question1: undefined;
  Question2: undefined;
  // ... up to Question26
  Question26: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Program: undefined;
  Nutrition: undefined;
  Stats: undefined;
  Profile: undefined;
};

// UI Component Types
export type MoodRating = 1 | 2 | 3 | 4 | 5;

export interface WheelPickerOption {
  value: string | number;
  label: string;
}

export interface SelectionOption {
  id: string;
  label: string;
  value: string;
  selected: boolean;
}

// API Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}