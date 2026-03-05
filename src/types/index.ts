// Типы для проекта BuhWeb

// Компания
export interface CompanyInfo {
    name: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    workingHours: string;
    inn: string;
    website: string;
}

// Услуга
export interface Service {
    id: number;
    icon: string;
    title: string;
    description: string;
    price: string;
    period: string;
    features: string[];
}

// Преимущество
export interface Feature {
    id: number;
    icon: string;
    title: string;
    description: string;
}

// Тарифный план
export interface PricingPlan {
    id: number;
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
}

// FAQ элемент
export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

// Отзыв
export interface Review {
    id: number;
    name: string;
    company: string;
    rating: number;
    text: string;
    avatar: string;
}

// Данные формы калькулятора
export interface CalculatorFormData {
    entityType: 'ip' | 'ooo' | 'zao';
    taxSystem: 'usn' | 'osn' | 'patent' | 'envd';
    employees: number;
    documents: number;
    needPayroll: boolean;
    needReports: boolean;
    needConsulting: boolean;
    needRegistration: boolean;
}

// Результат расчета
export interface CalculationResult {
    totalPrice: number;
    services: Array<{
        name: string;
        price: number;
        icon: string;
    }>;
    monthlyPrice: number;
    yearlyPrice: number;
    yearlyDiscount: number;
}

// Данные контактной формы
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

// Ошибки формы
export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

// Тип уведомления
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

// Уведомление
export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

// Тема
export type Theme = 'light' | 'dark';

// Состояние темы
export interface ThemeState {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    initializeTheme: () => void;
}

// Контент для админ-панели
export interface TextContent {
    id: string;
    key: string;
    value: string;
    section: string;
}

export interface ImageContent {
    id: string;
    src: string;
    alt: string;
    section: string;
    order: number;
}

export interface Block {
    id: string;
    type: 'text' | 'image' | 'hero' | 'services' | 'features' | 'calculator' | 'pricing' | 'reviews' | 'faq' | 'partners' | 'contact';
    content: unknown;
    section: string;
    order: number;
    visible: boolean;
}

// Пропсы для Skeleton компонентов
export interface SkeletonTextProps {
    lines?: number;
}
