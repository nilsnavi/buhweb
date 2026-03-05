import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      isDark: false,
      
      // Переключение темы
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        set({
          theme: newTheme,
          isDark: newTheme === 'dark'
        });
        
        // Применение темы к document
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.classList.toggle('dark-theme', newTheme === 'dark');
      },
      
      // Установка конкретной темы
      setTheme: (theme) => {
        set({
          theme,
          isDark: theme === 'dark'
        });
        
        document.documentElement.setAttribute('data-theme', theme);
        document.body.classList.toggle('dark-theme', theme === 'dark');
      },
      
      // Получение системной темы
      getSystemTheme: () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      },
      
      // Инициализация темы при загрузке
      initializeTheme: () => {
        const { theme: savedTheme } = get();
        const systemTheme = get().getSystemTheme();
        
        // Если сохраненная тема есть, используем её, иначе системную
        const theme = savedTheme || systemTheme;
        get().setTheme(theme);
        
        // Слушаем изменения системной темы
        if (window.matchMedia) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          mediaQuery.addListener((e) => {
            if (!get().theme) { // Только если пользователь не выбрал тему вручную
              get().setTheme(e.matches ? 'dark' : 'light');
            }
          });
        }
      }
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme })
    }
  )
);

// Экспорт для обратной совместимости
export const useTheme = () => {
  const { theme, isDark, toggleTheme, setTheme, initializeTheme } = useThemeStore();
  return { theme, isDark, toggleTheme, setTheme, initializeTheme };
};
