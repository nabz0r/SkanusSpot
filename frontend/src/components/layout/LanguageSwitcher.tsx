import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@/components/ui/select';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'et', name: 'Eesti' },
  { code: 'fr', name: 'Français' }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      value={i18n.language}
      onValueChange={handleLanguageChange}
      className="w-40"
    >
      {languages.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </Select>
  );
}