import { useState } from 'react';
import { soundManager } from '../../utils/soundManager';
import './CalculatorApp.css';

const CalculatorApp = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [trollMessage, setTrollMessage] = useState<string | null>(null);
    const [trollCount, setTrollCount] = useState(0);

    // Troll responses for wrong answers
    const trollResponses = [
        "Trust me, I'm a calculator! 🤖",
        "Math is hard, okay?",
        "Close enough!",
        "That's what I got too!",
        "Works on my machine ¯\\_(ツ)_/¯",
        "Have you tried turning it off and on?",
        "This is correct in base 13",
        "I learned math from Stack Overflow",
        "Error 404: Correct answer not found",
        "Powered by vibes-based computing",
    ];

    // Function to generate wrong answers in funny ways
    const trollCalculate = (left: number, op: string, right: number): number => {
        let correctAnswer: number;

        switch (op) {
            case '+':
                correctAnswer = left + right;
                break;
            case '-':
                correctAnswer = left - right;
                break;
            case '×':
                correctAnswer = left * right;
                break;
            case '÷':
                if (right === 0) {
                    setTrollMessage("I'm not falling for that divide by zero trick!");
                    return 42; // The answer to everything
                }
                correctAnswer = left / right;
                break;
            default:
                return right;
        }

        // Different trolling strategies
        const trollType = Math.floor(Math.random() * 10);

        switch (trollType) {
            case 0:
                // Off by one (classic programmer joke)
                return correctAnswer + 1;
            case 1:
                // Off by a bit more
                return correctAnswer + Math.floor(Math.random() * 5) + 1;
            case 2:
            {
                // Reverse the digits
                const reversed = parseInt(Math.abs(correctAnswer).toString().split('').reverse().join(''));
                return correctAnswer < 0 ? -reversed : reversed;
            }
            case 3:
                // Return 42 (the answer to everything)
                setTrollMessage("The answer to life, the universe, and everything!");
                return 42;
            case 4:
                // Return 69 or 420 for the memes
                setTrollMessage("Nice. 😎");
                return Math.random() > 0.5 ? 69 : 420;
            case 5:
                // Double it
                return correctAnswer * 2;
            case 6:
                // Return PI for no reason
                setTrollMessage("π is always the answer!");
                return 3.14159;
            case 7:
                // Return the year
                setTrollMessage("Time flies!");
                return 2024;
            case 8:
                // Actually correct! (rarely)
                setTrollMessage("Wait, that's actually correct! 🎉");
                return correctAnswer;
            default:
                // Slightly wrong
                return correctAnswer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3 + 1);
        }
    };

    const handleDigit = (digit: string) => {
        soundManager.playClick();
        setTrollMessage(null);

        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const handleOperator = (nextOperator: string) => {
        soundManager.playClick();
        setTrollMessage(null);
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operator) {
            const result = trollCalculate(previousValue, operator, inputValue);
            setDisplay(String(result));
            setPreviousValue(result);
            
            // Show troll message
            setTrollCount(prev => prev + 1);
            if (!trollMessage && trollCount > 0) {
                setTrollMessage(trollResponses[Math.floor(Math.random() * trollResponses.length)]);
            }
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const handleEquals = () => {
        soundManager.playClick();
        const inputValue = parseFloat(display);

        if (previousValue !== null && operator) {
            const result = trollCalculate(previousValue, operator, inputValue);
            setDisplay(String(result));
            setPreviousValue(null);
            setOperator(null);
            setWaitingForOperand(true);
            
            // Always show a troll message on equals
            setTrollCount(prev => prev + 1);
            if (!trollMessage) {
                setTrollMessage(trollResponses[Math.floor(Math.random() * trollResponses.length)]);
            }
        }
    };

    const handleClear = () => {
        soundManager.playClick();
        setDisplay('0');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        setTrollMessage(null);
    };

    const handleDecimal = () => {
        soundManager.playClick();
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handlePercent = () => {
        soundManager.playClick();
        const value = parseFloat(display);
        // Troll: percent does random things
        const trollPercent = Math.random() > 0.5 ? value / 100 : value * Math.random();
        setDisplay(String(trollPercent));
        setTrollMessage("Percents are confusing anyway!");
    };

    const handlePlusMinus = () => {
        soundManager.playClick();
        const value = parseFloat(display);
        setDisplay(String(-value));
    };

    return (
        <div className="calculator-app">
            {/* Display */}
            <div className="calc-display">
                <div className="calc-display__value">{display}</div>
                {trollMessage && (
                    <div className="calc-troll-message">{trollMessage}</div>
                )}
            </div>

            {/* Buttons */}
            <div className="calc-buttons">
                <button className="calc-btn calc-btn--function" onClick={handleClear}>C</button>
                <button className="calc-btn calc-btn--function" onClick={handlePlusMinus}>±</button>
                <button className="calc-btn calc-btn--function" onClick={handlePercent}>%</button>
                <button className="calc-btn calc-btn--operator" onClick={() => handleOperator('÷')}>÷</button>

                <button className="calc-btn" onClick={() => handleDigit('7')}>7</button>
                <button className="calc-btn" onClick={() => handleDigit('8')}>8</button>
                <button className="calc-btn" onClick={() => handleDigit('9')}>9</button>
                <button className="calc-btn calc-btn--operator" onClick={() => handleOperator('×')}>×</button>

                <button className="calc-btn" onClick={() => handleDigit('4')}>4</button>
                <button className="calc-btn" onClick={() => handleDigit('5')}>5</button>
                <button className="calc-btn" onClick={() => handleDigit('6')}>6</button>
                <button className="calc-btn calc-btn--operator" onClick={() => handleOperator('-')}>−</button>

                <button className="calc-btn" onClick={() => handleDigit('1')}>1</button>
                <button className="calc-btn" onClick={() => handleDigit('2')}>2</button>
                <button className="calc-btn" onClick={() => handleDigit('3')}>3</button>
                <button className="calc-btn calc-btn--operator" onClick={() => handleOperator('+')}>+</button>

                <button className="calc-btn calc-btn--zero" onClick={() => handleDigit('0')}>0</button>
                <button className="calc-btn" onClick={handleDecimal}>.</button>
                <button className="calc-btn calc-btn--equals" onClick={handleEquals}>=</button>
            </div>

            {/* Disclaimer */}
            <div className="calc-disclaimer">
                ⚠️ Results may vary. Not responsible for failed exams.
            </div>
        </div>
    );
};

export default CalculatorApp;
