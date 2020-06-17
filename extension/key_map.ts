import {
    Range,
    CompletionItemProvider,
    CompletionItem,
    CompletionItemKind,
    TextEdit,
} from 'vscode'

type Mappings = { [key: string]: string }

export let EscapedInputProvider: CompletionItemProvider = {
    async provideCompletionItems(document, position, token, context) {
        let range = new Range(position.translate(0, -1), position)
        let completions: Array<CompletionItem> = []
        for (const from in operator_maps) {
            let to: string = operator_maps[from]
            let item = new CompletionItem('\\' + from, CompletionItemKind.Operator)
            item.kind = CompletionItemKind.Operator
            item.textEdit = TextEdit.replace(range, to)
            completions.push(item)
        }
        for (const from in constant_maps) {
            let to: string = constant_maps[from]
            let item = new CompletionItem('\\' + from, CompletionItemKind.Constant)
            item.detail = to
            item.textEdit = TextEdit.replace(range, to)
            completions.push(item)
        }
        return completions
    },
}

const constant_maps: Mappings = {
    'empty': '∅',
    'mathbb{P}': 'ℙ',
    'mathbb{C}': 'ℂ',
    'mathbb{N}': 'ℕ',
    'mathbb{Q}': 'ℚ',
    'mathbb{R}': 'ℝ',
    'mathbb{Z}': 'ℤ',
}

const operator_maps: Mappings = {
    "`": "",
    "``": "",
    '<<': '⟪',
    '>>': '⟫',
    '.': '∙',
    'cdot': '⋅',
    'pm': '±',
    'mp': '∓',
    'times': '×',
    "*": '×',
    'div': '÷',
    'sqrt': '√',
    'sum': '∑',
    'int': '∫',
    'neg': '¬',
    'ne': '≠',
    'approx': '≈',
    '~~': '≈',
    ':=': '≔',
    'equiv': '≡',
    '==': '≡',
    'll': '≪',
    'gg': '≫',
    'le': '≤',
    '<=': '≤',
    'ge': '≥',
    '>=': '≥',
    '::': '∷',
    'in': '∈',
}
