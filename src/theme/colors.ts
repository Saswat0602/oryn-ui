// Color configuration system for Mad UI
export interface ColorScheme {
  // Background colors
  'bg-primary': string;
  'bg-secondary': string;
  'bg-tertiary': string;
  'bg-card': string;
  'bg-overlay': string;
  
  // Text colors
  'text-primary': string;
  'text-secondary': string;
  'text-muted': string;
  'text-inverse': string;
  
  // Border colors
  'border-primary': string;
  'border-secondary': string;
  'border-focus': string;
  
  // Accent colors
  'accent-primary': string;
  'accent-secondary': string;
  'accent-success': string;
  'accent-warning': string;
  'accent-error': string;
  'accent-info': string;
  
  // Shadow colors
  'shadow-sm': string;
  'shadow-md': string;
  'shadow-lg': string;
  'shadow-xl': string;
  
  // Status colors
  'success': string;
  'warning': string;
  'error': string;
  'info': string;
}

// Default light theme colors
export const lightColors: ColorScheme = {
  // Backgrounds
  'bg-primary': '#ffffff',
  'bg-secondary': '#f4f4f5',
  'bg-tertiary': '#ececee',
  'bg-card': '#ffffff',
  'bg-overlay': 'rgba(0, 0, 0, 0.5)',
  
  // Text
  'text-primary': '#09090b',
  'text-secondary': '#52525b',
  'text-muted': '#64646b',
  'text-inverse': '#ffffff',
  
  // Borders
  'border-primary': '#e4e4e7',
  'border-secondary': '#d4d4d8',
  'border-focus': '#18181b',
  
  // Accents
  'accent-primary': '#18181b',
  'accent-secondary': '#27272a',
  'accent-success': '#10b981',
  'accent-warning': '#f59e0b',
  'accent-error': '#dc2626',
  'accent-info': '#18181b',
  
  // Shadows
  'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  
  // Status
  'success': '#10b981',
  'warning': '#f59e0b',
  'error': '#dc2626',
  'info': '#18181b',
};

// Default dark theme colors (shadcn zinc monochrome)
export const darkColors: ColorScheme = {
  // Backgrounds
  'bg-primary': '#09090b',
  'bg-secondary': '#18181b',
  'bg-tertiary': '#27272a',
  'bg-card': '#09090b',
  'bg-overlay': 'rgba(0, 0, 0, 0.7)',
  
  // Text
  'text-primary': '#fafafa',
  'text-secondary': '#a1a1aa',
  'text-muted': '#a1a1aa',
  'text-inverse': '#09090b',
  
  // Borders
  'border-primary': '#27272a',
  'border-secondary': '#3f3f46',
  'border-focus': '#d4d4d8',
  
  // Accents
  'accent-primary': '#fafafa',
  'accent-secondary': '#e4e4e7',
  'accent-success': '#34d399',
  'accent-warning': '#fbbf24',
  'accent-error': '#f87171',
  'accent-info': '#fafafa',
  
  // Shadows
  'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
  'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
  
  // Status
  'success': '#34d399',
  'warning': '#fbbf24',
  'error': '#f87171',
  'info': '#fafafa',
};

// Normal light theme colors (vibrant blue)
export const normalLightColors: ColorScheme = {
  ...lightColors,
  'accent-primary': '#2563eb',
  'accent-secondary': '#1d4ed8',
  'border-focus': '#2563eb',
  'accent-info': '#2563eb',
  'info': '#2563eb',
};

// Normal dark theme colors (vibrant blue)
export const normalDarkColors: ColorScheme = {
  ...darkColors,
  'accent-primary': '#2563eb',
  'accent-secondary': '#1d4ed8',
  'border-focus': '#2563eb',
  'accent-info': '#2563eb',
  'info': '#2563eb',
};

export const monochromeLightColors = lightColors;
export const monochromeDarkColors = darkColors;

// Component-specific color definitions
export const componentColors = {
  button: {
    primary: {
      light: {
        bg: '#3b82f6',
        text: '#ffffff',
        hover: '#2563eb',
        focus: '#1d4ed8',
      },
      dark: {
        bg: '#60a5fa',
        text: '#0f172a',
        hover: '#3b82f6',
        focus: '#2563eb',
      },
    },
    secondary: {
      light: {
        bg: '#f1f5f9',
        text: '#0f172a',
        hover: '#e2e8f0',
        focus: '#cbd5e1',
      },
      dark: {
        bg: '#334155',
        text: '#f8fafc',
        hover: '#475569',
        focus: '#64748b',
      },
    },
    danger: {
      light: {
        bg: '#ef4444',
        text: '#ffffff',
        hover: '#dc2626',
        focus: '#b91c1c',
      },
      dark: {
        bg: '#f87171',
        text: '#0f172a',
        hover: '#ef4444',
        focus: '#dc2626',
      },
    },
    success: {
      light: {
        bg: '#10b981',
        text: '#ffffff',
        hover: '#059669',
        focus: '#047857',
      },
      dark: {
        bg: '#34d399',
        text: '#0f172a',
        hover: '#10b981',
        focus: '#059669',
      },
    },
  },
  card: {
    light: {
      bg: '#ffffff',
      border: '#e2e8f0',
      header: '#f8fafc',
    },
    dark: {
      bg: '#1e293b',
      border: '#334155',
      header: '#0f172a',
    },
  },
  input: {
    light: {
      bg: '#ffffff',
      border: '#cbd5e1',
      text: '#0f172a',
      placeholder: '#94a3b8',
      focus: '#3b82f6',
    },
    dark: {
      bg: '#1e293b',
      border: '#475569',
      text: '#f8fafc',
      placeholder: '#64748b',
      focus: '#60a5fa',
    },
  },
};

// Helper function to get color value with fallback
export function getColor(colorName: keyof ColorScheme, isDark = false): string {
  const scheme = isDark ? darkColors : lightColors;
  return scheme[colorName] || lightColors[colorName];
}

// Helper function to generate CSS variables
export function generateCssVariables(isDark = false): Record<string, string> {
  const scheme = isDark ? darkColors : lightColors;
  const variables: Record<string, string> = {};
  
  Object.entries(scheme).forEach(([key, value]) => {
    variables[`--mad-${key}`] = value;
  });
  
  return variables;
}

