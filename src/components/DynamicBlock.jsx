import React, { lazy, Suspense } from 'react';
import { useAppSelector } from '../store/store';

// Lazy loading для всех типов блоков
const blockComponents = {
    hero: lazy(() => import('./Hero.jsx')),
    services: lazy(() => import('./Services.jsx')),
    features: lazy(() => import('./Features.jsx')),
    calculator: lazy(() => import('./Calculator.jsx')),
    pricing: lazy(() => import('./Pricing.jsx')),
    reviews: lazy(() => import('./Reviews.jsx')),
    faq: lazy(() => import('./FAQ.jsx')),
    partners: lazy(() => import('./Partners.jsx')),
    contact: lazy(() => import('./Contact.jsx')),
};

// Компонент загрузки
const BlockLoader = () => (
    <div style={{
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
    }}>
        <div className="skeleton" style={{ width: '100%', height: '200px', borderRadius: '12px' }} />
    </div>
);

// Компонент для текстового блока
const TextBlock = ({ content }) => (
    <section className="text-block" style={{ padding: '4rem 0', background: content.background || 'transparent' }}>
        <div className="container">
            {content.title && <h2 className="section-title">{content.title}</h2>}
            {content.text && <div className="text-content" dangerouslySetInnerHTML={{ __html: content.text }} />}
        </div>
    </section>
);

// Компонент для блока изображения
const ImageBlock = ({ content }) => (
    <section className="image-block" style={{ padding: '4rem 0', background: content.background || 'transparent' }}>
        <div className="container">
            {content.src && (
                <img
                    src={content.src}
                    alt={content.alt || ''}
                    style={{
                        width: content.width || '100%',
                        height: content.height || 'auto',
                        objectFit: content.objectFit || 'cover',
                        borderRadius: content.borderRadius || '0'
                    }}
                />
            )}
        </div>
    </section>
);

const DynamicBlock = ({ blockId }) => {
    const block = useAppSelector(state =>
        state.content.blocks.find(b => b.id === blockId)
    );

    if (!block || !block.visible) {
        return null;
    }

    // Для кастомных текстовых и image блоков
    if (block.type === 'text') {
        return <TextBlock content={block.content} />;
    }

    if (block.type === 'image') {
        return <ImageBlock content={block.content} />;
    }

    // Для стандартных блоков
    const BlockComponent = blockComponents[block.type];

    if (!BlockComponent) {
        console.warn(`Unknown block type: ${block.type}`);
        return null;
    }

    return (
        <Suspense fallback={<BlockLoader />}>
            <BlockComponent />
        </Suspense>
    );
};

// Компонент для рендеринга всех блоков
export const DynamicBlocksList = () => {
    const blocks = useAppSelector(state =>
        state.content.blocks
            .filter(b => b.visible)
            .sort((a, b) => a.order - b.order)
    );

    return (
        <>
            {blocks.map(block => (
                <DynamicBlock key={block.id} blockId={block.id} />
            ))}
        </>
    );
};

export default DynamicBlock;
