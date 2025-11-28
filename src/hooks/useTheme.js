// Theme management hook
function useTheme() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.classList.toggle('dark-theme', newTheme === 'dark')
  }

  React.useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
  }, [theme])

  return { theme, toggleTheme }
}

window.useTheme = useTheme
