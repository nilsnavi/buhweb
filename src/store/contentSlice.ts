import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Загрузка данных из localStorage
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('adminContent');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return null;
};

// Сохранение данных в localStorage
const saveToStorage = (state: ContentState) => {
  try {
    localStorage.setItem('adminContent', JSON.stringify({
      texts: state.texts,
      images: state.images,
      blocks: state.blocks,
    }));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

interface TextContent {
  id: string;
  key: string;
  value: string;
  section: string;
}

interface ImageContent {
  id: string;
  src: string;
  alt: string;
  section: string;
  order: number;
}

interface Block {
  id: string;
  type: 'text' | 'image' | 'hero' | 'services' | 'features' | 'calculator' | 'pricing' | 'reviews' | 'faq' | 'contact';
  content: any;
  section: string;
  order: number;
  visible: boolean;
}

interface ContentState {
  texts: TextContent[];
  images: ImageContent[];
  blocks: Block[];
  loading: boolean;
  error: string | null;
}

const defaultState: ContentState = {
  texts: [
    { id: '1', key: 'hero_title', value: 'Бухгалтерские услуги для вашего бизнеса', section: 'hero' },
    { id: '2', key: 'hero_subtitle', value: 'Профессиональный бухгалтерский учет и консалтинг', section: 'hero' },
    { id: '3', key: 'services_title', value: 'Наши услуги', section: 'services' },
    { id: '4', key: 'contact_title', value: 'Свяжитесь с нами', section: 'contact' },
  ],
  images: [
    { id: '1', src: '/assets/images/hero-bg.jpg', alt: 'Бухгалтерия', section: 'hero', order: 1 },
    { id: '2', src: '/assets/images/office.jpg', alt: 'Офис', section: 'about', order: 1 },
  ],
  blocks: [
    { id: '1', type: 'hero', content: {}, section: 'hero', order: 1, visible: true },
    { id: '2', type: 'services', content: {}, section: 'services', order: 2, visible: true },
    { id: '3', type: 'features', content: {}, section: 'features', order: 3, visible: true },
    { id: '4', type: 'calculator', content: {}, section: 'calculator', order: 4, visible: true },
    { id: '5', type: 'pricing', content: {}, section: 'pricing', order: 5, visible: true },
    { id: '6', type: 'reviews', content: {}, section: 'reviews', order: 6, visible: true },
    { id: '7', type: 'faq', content: {}, section: 'faq', order: 7, visible: true },
    { id: '8', type: 'contact', content: {}, section: 'contact', order: 8, visible: true },
  ],
  loading: false,
  error: null,
};

// Загружаем сохраненные данные или используем значения по умолчанию
const storedData = loadFromStorage();
const initialState: ContentState = storedData ? {
  ...defaultState,
  ...storedData,
} : defaultState;

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // Текстовый контент
    updateText: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const text = state.texts.find(t => t.id === action.payload.id);
      if (text) {
        text.value = action.payload.value;
        saveToStorage(state);
      }
    },
    addText: (state, action: PayloadAction<Omit<TextContent, 'id'>>) => {
      const newText = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.texts.push(newText);
      saveToStorage(state);
    },
    deleteText: (state, action: PayloadAction<string>) => {
      state.texts = state.texts.filter(t => t.id !== action.payload);
      saveToStorage(state);
    },

    // Изображения
    updateImage: (state, action: PayloadAction<{ id: string; updates: Partial<ImageContent> }>) => {
      const image = state.images.find(img => img.id === action.payload.id);
      if (image) {
        Object.assign(image, action.payload.updates);
        saveToStorage(state);
      }
    },
    addImage: (state, action: PayloadAction<Omit<ImageContent, 'id'>>) => {
      const newImage = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.images.push(newImage);
      saveToStorage(state);
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(img => img.id !== action.payload);
      saveToStorage(state);
    },

    // Блоки
    updateBlock: (state, action: PayloadAction<{ id: string; updates: Partial<Block> }>) => {
      const block = state.blocks.find(b => b.id === action.payload.id);
      if (block) {
        Object.assign(block, action.payload.updates);
        saveToStorage(state);
      }
    },
    addBlock: (state, action: PayloadAction<Omit<Block, 'id'>>) => {
      const newBlock = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.blocks.push(newBlock);
      saveToStorage(state);
    },
    deleteBlock: (state, action: PayloadAction<string>) => {
      state.blocks = state.blocks.filter(b => b.id !== action.payload);
      saveToStorage(state);
    },
    reorderBlocks: (state, action: PayloadAction<{ blockIds: string[] }>) => {
      const { blockIds } = action.payload;
      blockIds.forEach((id, index) => {
        const block = state.blocks.find(b => b.id === id);
        if (block) {
          block.order = index + 1;
        }
      });
      saveToStorage(state);
    },

    // Статус
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateText,
  addText,
  deleteText,
  updateImage,
  addImage,
  deleteImage,
  updateBlock,
  addBlock,
  deleteBlock,
  reorderBlocks,
  setLoading,
  setError,
} = contentSlice.actions;

export default contentSlice.reducer;
