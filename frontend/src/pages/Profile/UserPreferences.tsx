import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

export function UserPreferences({ user }) {
  const { t } = useTranslation();
  const [preferences, setPreferences] = React.useState(user.preferences);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newPreferences) => {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPreferences),
      });
      if (!response.ok) throw new Error('Failed to update preferences');
      return response.json();
    }
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          {t('profile.preferredLanguage')}
        </label>
        <Select
          value={preferences.language}
          onValueChange={(value) => 
            setPreferences({ ...preferences, language: value })
          }
        >
          <option value="en">English</option>
          <option value="lt">Lietuvių</option>
          <option value="lv">Latviešu</option>
          <option value="et">Eesti</option>
          <option value="fr">Français</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {t('profile.dietaryPreferences')}
        </label>
        <div className="space-y-2">
          {['halal', 'kosher', 'vegan', 'vegetarian'].map((diet) => (
            <label key={diet} className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.diet?.includes(diet)}
                onChange={(e) => {
                  const newDiet = e.target.checked
                    ? [...(preferences.diet || []), diet]
                    : preferences.diet?.filter(d => d !== diet);
                  setPreferences({ ...preferences, diet: newDiet });
                }}
                className="mr-2"
              />
              {t(`diet.${diet}`)}
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={() => mutate(preferences)}
        disabled={isLoading}
      >
        {t('common.save')}
      </Button>
    </div>
  );
}