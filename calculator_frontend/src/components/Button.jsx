import React from 'react';

// PUBLIC_INTERFACE
function Button({ value, onClick, type, active, ariaLabel }) {
  /**
   * Calculator button component with a glossy, iPhone-like sheen.
   * 
   * Styling is applied via the .calc-btn-ios base class and type-specific flavor
   * classes (e.g., .calc-btn-ios-op, .calc-btn-ios-num, etc).
   * 
   * - Maintains accessibility and focus ring.
   * - Preserves current API and behavior.
   * - All gloss/shine/active effects are achieved using CSS backgrounds and gradients.
   * 
   * Props:
   *   @param {string} value - Display value of the button.
   *   @param {function} onClick - Click handler.
   *   @param {string} type - 'num', 'op', 'utility', or 'equals'.
   *   @param {boolean} active - If the button is currently active/selected.
   *   @param {string} ariaLabel - Accessible label for screen readers.
   */
  let className = 'calc-btn-ios';
  if (type) className += ' calc-btn-ios-' + type;
  if (active) className += ' calc-btn-ios-active';

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={!!active}
      aria-label={ariaLabel || value}
      tabIndex={0}
      // tabindex, aria-pressed, role handled for accessibility
    >
      {value}
    </button>
  );
}

export default Button;
