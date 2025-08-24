/**
 * condex.js - Conditional Visibility Management
 * @description Dynamically controls the visibility of HTML elements based on specified conditions.
 * @author Squirtle
 * @github https://github.com/gulmzugur/condex
 * @version 1.0.0
 * @license MIT
 *
 * Features:
 * - Supports conditions like 'is', 'not', 'contains', 'less_than', 'greater_than'
 * - Evaluates multiple conditions with 'and' or 'or' operators
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const elements = 'select, input';
    const conditionalElements = document.querySelectorAll('[data-condition]');

    document.querySelectorAll('[data-condition-field]').forEach(function (item) {
        item.addEventListener('change', function (e) {
            if (e.target.matches(elements)) {
                conditionEngine();
            }
        });

        if (item.matches('select')) {
            if ($(item).hasClass('select2-hidden-accessible')) {
                $(item).on('select2:select select2:unselect', function (e) {
                    conditionEngine();
                });
            } else {
                item.addEventListener('change', function() {
                    conditionEngine();
                });
            }
        }
    });

    conditionEngine();

    function getMatchCondition(condition) {
        const regex = /(.+?):(is|not|contains|less_than|less_than_or_equal_to|greater_than|greater_than_or_equal_to)\((.*?)\),?/g;
        const conditions = [];
        let match;

        while ((match = regex.exec(condition)) !== null) {
            conditions.push({
                check: match[1],
                rule: match[2],
                value: match[3] || ''
            });
        }

        return conditions;
    }

    function evaluateCondition(v1, v2, rule) {
        const num1 = parseFloat(v1);
        const num2 = parseFloat(v2);

        switch (rule) {
            case 'less_than':
                return num1 < num2;
            case 'less_than_or_equal_to':
                return num1 <= num2;
            case 'greater_than':
                return num1 > num2;
            case 'greater_than_or_equal_to':
                return num1 >= num2;
            case 'contains':
                return v1.includes(v2);
            case 'is':
                return v1 === v2;
            case 'not':
                return v1 !== v2;
            default:
                console.warn(`Undefined Rule: ${rule}`);
                return false;
        }
    }

    function conditionEngine() {
        conditionalElements.forEach(function (element) {
            const conditions = getMatchCondition(element.getAttribute('data-condition'));
            const operator = (element.getAttribute('data-condition-operator') || 'and').toLowerCase();
            let passed;

            conditions.forEach(function (condition) {
                let target = document.querySelector(`[name="${condition.check}"]`);

                if (target && target.type === 'radio') {
                    const radioGroup = document.querySelectorAll(`[name="${condition.check}"]`);
                    target = Array.from(radioGroup).find(radio => radio.checked);
                }

                if (!target || (!target.value && condition.value !== '')) {
                    return;
                }

                let v1 = target.value;
                const v2 = condition.value.toString();

                if (target.type === 'checkbox' || target.type === 'radio') {
                    v1 = target.checked ? v1 : '';
                }

                const result = evaluateCondition(v1, v2, condition.rule);

                if (typeof passed === 'undefined') {
                    passed = result;
                } else if (operator === 'or') {
                    passed = passed || result;
                } else {
                    passed = passed && result;
                }
            });

            setElementVisibility(element, passed);
        });
    }

    function setElementVisibility(element, isVisible) {
        const currentDisplay = window.getComputedStyle(element).display;
        const targetDisplay = isVisible ? '' : 'none';

        if (currentDisplay !== targetDisplay) {
            element.style.display = targetDisplay;
        }
    }
});
