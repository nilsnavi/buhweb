import React from 'react';

export const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
    </div>
);

export const SkeletonText = ({ lines = 3 }) => (
    <div className="skeleton-text-group">
        {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="skeleton skeleton-line"></div>
        ))}
    </div>
);

export const SkeletonForm = () => (
    <div className="skeleton-form">
        <div className="skeleton skeleton-label"></div>
        <div className="skeleton skeleton-input"></div>
        <div className="skeleton skeleton-label"></div>
        <div className="skeleton skeleton-input"></div>
        <div className="skeleton skeleton-label"></div>
        <div className="skeleton skeleton-input"></div>
        <div className="skeleton skeleton-button"></div>
    </div>
);

export const SkeletonCalculator = () => (
    <div className="skeleton-calculator">
        <div className="skeleton-form-section">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-radio-group"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-select"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-range"></div>
        </div>
        <div className="skeleton-result-section">
            <div className="skeleton skeleton-result-box"></div>
        </div>
    </div>
);
