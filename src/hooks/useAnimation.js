// Animation hook for scroll animations and interactions
function useAnimation() {
  const [isVisible, setIsVisible] = React.useState({})

  // Setup intersection observer for scroll animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id || entry.target.dataset.animate
          if (id) {
            setIsVisible((prev) => ({
              ...prev,
              [id]: entry.isIntersecting,
            }))
          }
        })
      },
      {
        threshold: CONSTANTS.ANIMATION.INTERSECTION_THRESHOLD,
        rootMargin: '50px',
      }
    )

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, [data-animate]'
    )
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Smooth scroll to element
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Animate counter numbers
  const animateCounter = (ref, targetValue, duration = 2000) => {
    if (!ref.current) return

    const startValue = 0
    const increment = targetValue / (duration / 16)
    let currentValue = startValue

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= targetValue) {
        currentValue = targetValue
        clearInterval(timer)
      }
      ref.current.textContent = Math.floor(currentValue).toLocaleString()
    }, 16)

    return () => clearInterval(timer)
  }

  // Stagger animation for lists
  const staggerAnimation = (selector, delay = 100) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in')
      }, index * delay)
    })
  }

  return {
    isVisible,
    scrollToElement,
    animateCounter,
    staggerAnimation,
  }
}

window.useAnimation = useAnimation
