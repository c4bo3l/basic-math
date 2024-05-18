import { atomWithStorage } from "jotai/utils";

export const ThemeModes = ['dark', 'light'] as const;
export type ThemeMode = (typeof ThemeModes)[number];

const ThemeState = atomWithStorage<ThemeMode>('basic_math_theme', 'dark');

export default ThemeState;
