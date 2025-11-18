import React from 'react';

// PUBLIC_INTERFACE
function Display({ value, error, ariaLabel }) {
  /**
   * Calculator display component.
   * @param {string} value The value to display.
   * @param {boolean} error Whether to show error styling.
   * @param {string} ariaLabel The aria-label for screen readers.
   */
  return (
    <div
      className="calc-display display-white"
      aria-live="polite"
      aria-label={ariaLabel}
      tabIndex={0}
      style={{
        color: error ? 'hsl(0 84% 60%)' : '#111827'
      }}
    >
      {value}
    </div>
  );
}

export default Display;
