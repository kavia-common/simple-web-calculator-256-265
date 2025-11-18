import React from 'react';

// PUBLIC_INTERFACE
function Button({ value, onClick, type, active, ariaLabel }) {
  /**
   * Calculator button component.
   * @param {string} value Display value of the button.
   * @param {function} onClick Click handler.
   * @param {string} type Button type: 'num', 'op', 'utility', or 'equals'.
   * @param {boolean} active If the button is currently active/selected.
   * @param {string} ariaLabel Accessible label for screen readers.
   */
  let className = 'calc-btn';
  if (type) className += ' calc-btn-' + type;
  if (active) className += ' calc-btn-active';

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={!!active}
      aria-label={ariaLabel || value}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

export default Button;
