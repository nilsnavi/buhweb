// Calculator hook for pricing calculations
function useCalculator() {
  const [formData, setFormData] = React.useState({
    businessType: 'ip',
    taxSystem: 'usn',
    employees: 0,
    operations: 10,
    services: [],
  })

  const [result, setResult] = React.useState(null)

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculatePrice = () => {
    let basePrice = 0

    // Base pricing logic
    if (formData.businessType === 'ip') {
      basePrice =
        formData.taxSystem === 'usn'
          ? CONSTANTS.PRICING.IP_USN
          : CONSTANTS.PRICING.IP_OSNO
    } else {
      basePrice =
        formData.taxSystem === 'usn'
          ? CONSTANTS.PRICING.OOO_USN
          : CONSTANTS.PRICING.OOO_OSNO
    }

    // Additional costs for employees
    const employeeCost = formData.employees * 500

    // Additional costs for extra operations
    const extraOperations = Math.max(0, formData.operations - 30)
    const operationCost = extraOperations * 50

    // Service modifiers
    let serviceMultiplier = 1
    if (formData.services.includes('analysis')) serviceMultiplier += 0.3
    if (formData.services.includes('consulting')) serviceMultiplier += 0.2
    if (formData.services.includes('registration')) serviceMultiplier += 0.1

    const totalPrice = Math.round(
      (basePrice + employeeCost + operationCost) * serviceMultiplier
    )

    setResult({
      basePrice,
      employeeCost,
      operationCost,
      serviceMultiplier,
      totalPrice,
      savings: Math.round(totalPrice * 0.15), // Estimated savings
    })
  }

  const resetCalculator = () => {
    setFormData({
      businessType: 'ip',
      taxSystem: 'usn',
      employees: 0,
      operations: 10,
      services: [],
    })
    setResult(null)
  }

  return {
    formData,
    result,
    updateField,
    calculatePrice,
    resetCalculator,
  }
}

window.useCalculator = useCalculator
