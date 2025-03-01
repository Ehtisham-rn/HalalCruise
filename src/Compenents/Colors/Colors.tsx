// Base colors
const baseColors = {
  primary: "#055068",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#858585",
  success: "#13C75F",
  warning: "#F89635",
  error: "#FF0000",
  info: "#2F80ED",
};

// Opacity levels
const opacity = {
  10: "1A",
  20: "33",
  30: "4D",
  40: "66",
  50: "80",
  60: "99",
  70: "B3",
  80: "CC",
  90: "E6",
};

// Generate color variants
const generateColorVariants = (color: string) => ({
  default: color,
  light: `${color}${opacity[20]}`,
  medium: `${color}${opacity[50]}`,
  dark: `${color}${opacity[80]}`,
});

// Theme colors
const Colors = {
  // Base colors
  ...baseColors,

  // Generated variants
  primary: generateColorVariants(baseColors.primary),
  gray: generateColorVariants(baseColors.gray),
  success: generateColorVariants(baseColors.success),
  warning: generateColorVariants(baseColors.warning),
  error: generateColorVariants(baseColors.error),
  info: generateColorVariants(baseColors.info),

  // Backgrounds
  backgrounds: {
    light: "#F5F5F5",
    dark: "#1A1A1A",
    primary: baseColors.primary,
    success: "#E6F5E8",
    warning: "#FFF4E5",
    error: "#FEE5E5",
    info: "#E5F9FF",
  },

  // Text
  text: {
    primary: baseColors.primary,
    secondary: baseColors.gray,
    light: baseColors.white,
    dark: baseColors.black,
    success: baseColors.success,
    warning: baseColors.warning,
    error: baseColors.error,
    info: baseColors.info,
  },

  // Borders
  borders: {
    light: "#E0E0E0",
    medium: "#BDBDBD",
    dark: "#858585",
  },

  // Shadows
  shadows: {
    light: "#0000001A",
    medium: "#0000004D",
    dark: "#00000080",
  },

  // Specific components
  homeBoxes: {
    box1: "#E5F9FF",
    box2: "#E6F5E8",
    box3: "#FFF4E5",
    box4: "#FEE5E5",
    box5: "#F7EBF4",
    box6: "#E9F8F7",
  },

  InputFieldBackground: "#D9D9D94D",
  InputFieldBorder: "#8585854D",
  HomeBox1: "#E5F9FF",
  HomeBox2: "#E6F5E8",
  HomeBox3: "#FFF4E5",
  HomeBox4: "#FEE5E5",
  HomeBox5: "#F7EBF4",
  HomeBox6: "#E9F8F7",
  RegistrationConfirmedtext: "#13C75F",
  warningTextColor: "#F89635",
  Golden: "#E8C464",



  MoveBackgroundColor: "#FFFFFF",
  MoveSecondary: "#787869",
  MoveScreenbackgroundColor: "EFEFEF",
  MoveDefaultFontColor: "#787869",
  LightGreenBackground: "#C7EFCF",
  DarkGreenText: "#006400",
  Primary: "#5372FF",
  rgbaColor: "rgba(55, 48, 141, 0.8)",
};

export default Colors;
