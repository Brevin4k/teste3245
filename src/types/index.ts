export type ButtonShape = 'pill' | 'rounded' | 'soft' | 'sharp';
export type ButtonVariant = 'solid' | 'outline' | 'glass' | 'glow' | 'gradient';
export type ButtonAnimation = 'none' | 'pulse' | 'shimmer' | 'bounce';
export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'glow';
export type ButtonSize = 'compact' | 'normal' | 'spacious';
export type ActionType = 'link' | 'whatsapp' | 'copy';

export interface ButtonItem {
  id: string;
  label: string;
  subtitle?: string;
  url: string;
  icon: string;
  highlightTag?: string;
  enabled: boolean;
  actionType: ActionType;
  customBgColor?: string;
  customTextColor?: string;
  customBorderColor?: string;
}

export interface EstablishmentProfile {
  name: string;
  tagline: string;
  logoUrl: string;
  logoShape: 'circle' | 'rounded' | 'square';
  hasLogoBorder: boolean;
  logoBorderColor: string;
  statusBadge: string;
  isVerified: boolean;
  address?: string;
  instagram?: string;
  phone?: string;
}

export type BgType = 'color' | 'gradient' | 'pattern' | 'mesh';
export type BgPattern = 'none' | 'dots' | 'grid' | 'lines' | 'waves';

export interface StyleConfig {
  bgType: BgType;
  bgColor: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgGradientDirection: string;
  bgPattern: BgPattern;
  fontFamily: 'sans' | 'serif' | 'display';
  themePresetId: string;
}

export interface ButtonStyleConfig {
  shape: ButtonShape;
  variant: ButtonVariant;
  bgColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  shadow: ButtonShadow;
  animation: ButtonAnimation;
  size: ButtonSize;
}

export interface AppConfig {
  profile: EstablishmentProfile;
  buttons: ButtonItem[];
  style: StyleConfig;
  buttonStyle: ButtonStyleConfig;
}

export interface ThemePreset {
  id: string;
  name: string;
  category: string;
  config: AppConfig;
  previewColor: string;
}

