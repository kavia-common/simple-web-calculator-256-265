import React, { useState, useRef, useEffect } from 'react';
import Display from './Display';
import Button from './Button';

const BUTTONS = [
  ['C', '⌫', '÷', '×'],
  ['7', '8', '9', '−'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.', ''],
];

const OPERATORS = {
  '+': '+',
  '−': '-',
  '-': '-',
  '×': '*',
  '*': '*',
  '÷': '/',
  '/': '/',
};

const OP_DISPLAY = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
  '−': '−',
  '×': '×',
  '÷': '÷',
};

const isOperator = (val) => Object.keys(OPERATORS).includes(val);

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [error, setError] = useState(null);
  const displayRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      let key = e.key;
      if (key === 'Escape') { handleInput('C'); return; }
      if (key === 'Backspace') { handleInput('⌫'); return; }
      if (key === 'Enter' || key === '=') { handleInput('='); return; }
      if ('0123456789'.includes(key)) { handleInput(key); return; }
      if (key === '.') { handleInput('.'); return; }
      if (['+', '-', '*', '/'].includes(key)) {
        let uiOp = key === '-' ? '−' : key === '*' ? '×' : key === '/' ? '÷' : '+';
        handleInput(uiOp);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, waitingForOperand, error]);

  function handleInput(val) {
    if (error && val !== 'C') {
      return;
    }

    if (val === 'C') {
      setDisplay('0');
      setExpression('');
      setError(null);
      setWaitingForOperand(false);
      return;
    }

    if (val === '⌫') {
      if (error) {
        setDisplay('0');
        setExpression('');
        setError(null);
        setWaitingForOperand(false);
        return;
      }
      if (display.length > 1) {
        const newDisplay = display.slice(0, -1);
        setDisplay(newDisplay);
        if (expression.length > 0) setExpression(expression.slice(0, -1));
      } else {
        setDisplay('0');
        setExpression('');
      }
      setWaitingForOperand(false);
      return;
    }

    if (val === '=') {
      if (!expression || isOperator(expression.slice(-1))) {
        return;
      }
      try {
        let expr = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        let result = eval(expr);
        if (!isFinite(result) || result === undefined) {
          setError('Error');
          setDisplay('Error');
          return;
        }
        setDisplay(result.toString());
        setExpression(result.toString());
        setWaitingForOperand(true);
        setError(null);
      } catch (e) {
        setDisplay('Error');
        setError('Error');
      }
      return;
    }

    if (isOperator(val)) {
      if (!expression) {
        if (val === '−' || val === '-') {
          setExpression('-');
          setDisplay('-');
        }
        return;
      }
      if (isOperator(expression.slice(-1))) {
        return;
      }
      setExpression(expression + val);
      setDisplay(val);
      setWaitingForOperand(false);
      return;
    }

    if (val === '.') {
      let idx = Math.max(...Object.keys(OPERATORS).map(op => expression.lastIndexOf(op)));
      let lastNum = expression.slice(idx + 1);
      if (lastNum.includes('.')) return;
      if (!expression || isOperator(expression.slice(-1))) {
        setExpression(expression + '0.');
        setDisplay('0.');
      } else {
        setExpression(expression + '.');
        setDisplay(display === '0' ? '0.' : display + '.');
      }
      setWaitingForOperand(false);
      return;
    }

    if ('0123456789'.includes(val)) {
      if (waitingForOperand) {
        setExpression(val);
        setDisplay(val);
        setWaitingForOperand(false);
        return;
      }
      if (display === '0' || isOperator(display)) {
        setDisplay(val);
      } else if (display.length < 16) {
        setDisplay(display + val);
      }
      setExpression(
        (expression === '0' || isOperator(expression.slice(-1))) ? expression + val : expression + val
      );
      return;
    }
  }

  return (
    <div className="calc-container" tabIndex={-1} ref={displayRef}>
      <Display value={display || '0'} error={!!error} ariaLabel={error ? error : display} />
      <div className="calc-grid">
        {BUTTONS.map((row, i) =>
          <div key={i} className="calc-row">
            {row.map((val, j) => (
              val ? (
                <Button
                  key={val}
                  value={val}
                  type={
                    val === 'C' || val === '⌫' ? 'utility'
                    : val === '=' ? 'equals'
                    : isOperator(val) ? 'op'
                    : 'num'
                  }
                  active={isOperator(val) && isOperator(display)}
                  onClick={() => handleInput(val)}
                  ariaLabel={
                    val === '⌫' ? 'Backspace' : val === 'C' ? 'Clear' : val === '=' ? 'Equals' : val
                  }
                />
              ) : <div key={'empty-' + j} className="calc-placeholder" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
