import { atomWithStorage } from "jotai/utils";

export const LanguageOptions = ['enUS', 'idID'] as const;
export type LanguageOption = (typeof LanguageOptions)[number];

const LanguageState = atomWithStorage<LanguageOption>('basic_math_lang', 'enUS');

export default LanguageState;
