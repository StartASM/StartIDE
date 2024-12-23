import * as monaco from 'monaco-editor';

export function registerStartASMLanguage() {
    monaco.languages.register({ id: 'startasm' });

    monaco.languages.setMonarchTokensProvider('startasm', {
        tokenizer: {
            root: [
                // Instructions
                [/\b(move|load|store|create|cast|add|sub|multiply|divide|or|and|not|shift|compare|jump|call|push|pop|return|input|output|print)\b/, 'keyword.instruction'],

                // Registers
                [/\b(r[0-9]+|register|sp)\b/, 'variable'],

                // Types
                [/\b(boolean|true|false)\b/, 'boolean'],

                // Numbers
                [/\b\d+\b/, 'number'],
                [/\b(integer)\b/, 'number'],

                // Hex
                [/\b0[xX][0-9a-fA-F]+\b/, 'number.hex'],

                // Characters
                [/'(?:\\.|[^'])'/, 'character'],

                // Strings
                [/".*?"/, 'string'],
                [/\b(newline)\b/, 'keyword.string'],

                // Label Matching
                [/'[^']*'/, 'label'], // Matches any label-like token (e.g., 'xyz')
                [/\b(label)\b/, 'label'],

                // Comments
                [/\bcomment\s+"[^"]*"/, 'comment'],

                // Memory Literals
                [/(m<\d+>|memory)/, 'literal.memory'],

                // Instruction Literals
                [/(i\[\d+\]|instruction)/, 'literal.instruction'],

                // Conjunctions
                [/\b(from)\b/, 'keyword.conjunctionSrc'],
                [/\b(to)\b/, 'keyword.conjunctionDest'],
                [/\b(with|by)\b/, 'keyword.conjunctionOpr'],
                [/\b(if|unconditional|greater|less|equal|unequal|zero|nonzero|positive|negative|overflow|nonoverflow)\b/, 'keyword.conjunctionCond'],
                [/\b(left|right)\b/, 'keyword.conjunctionAttr'],

                // Stop
                [/\b(stop)\b/, 'keyword.stop'],
            ],
        },
    });

    monaco.languages.setLanguageConfiguration('startasm', {
        brackets: [
            ['[', ']'],
            ['<', '>']
        ],
        autoClosingPairs: [
            { open: '[', close: ']' },
            { open: '<', close: '>' },
            { open: '"', close: '"' },
            { open: "'", close: "'"},
        ],
    });
}
