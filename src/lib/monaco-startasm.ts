import * as monaco from 'monaco-editor';

export function registerStartASMLanguage() {
    monaco.languages.register({ id: 'startasm' });

    monaco.languages.setMonarchTokensProvider('startasm', {
        tokenizer: {
            root: [
                // Instructions
                [/\b(move|load|store|create|cast|add|sub|multiply|divide|or|and|not|shit|compare|jump|call|push|pop|return|stop|input|output|print)\b/, 'keyword.instruction'],

                // Registers
                [/\b(r[0-9]+)\b/, 'variable'],

                // Types
                [/\b(integer|boolean|character|memory)\b/, 'variable'],

                // Numbers
                [/\b\d+\b/, 'number'],

                // Hex
                [/\b0[xX][0-9a-fA-F]+\b/, 'number.hex'],

                // Characters
                [/'.'/, 'character'],

                // Strings
                [/".*?"/, 'string'],
                [/\b(newline)\b/, 'keyword.string'],

                // Labels
                [/\blabel\s+'[^']*'/, 'function'],

                // Calls
                [/\bcall\s+'[^']*'/, 'function'],

                // Comments
                [/\bcomment\s+"[^"]*"/, 'comment'],

                // Memory Literals
                [/m<\d+>/, 'literal.memory'],

                // Instruction Literals
                [/i\[\d+]/, 'literal.instruction'],

                // Conjunctions
                [/\b(from)\b/, 'keyword.conjunctionSrc'],
                [/\b(to)\b/, 'keyword.conjunctionDest'],
                [/\b(with)\b/, 'keyword.conjunctionOpr'],
                [/\b(if|unconditional|greater|less|equal|unequal|zero|nonzero|positive|negative|overflow|nonoverflow)\b/, 'keyword.conjunctionCond'],
                [/\b(left|right)\b/, 'keyword.conjunctionAttr'],


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
