import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';

const locales = RNLocalize.getLocales();

const i18n = new I18n();

if (Array.isArray(locales)) {
  i18n.locale = locales[0]?.languageTag ? locales[0].languageTag : 'en';
}
export const locale = locales[0]?.languageCode;

i18n.enableFallback = true;

i18n.defaultLocale = 'en';

i18n.translations = {
  en,
};

export default i18n;

export enum ContentLanguage {
  English = 'en',
}

export type TxKeyPath = RecursiveKeyOf<typeof en>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
