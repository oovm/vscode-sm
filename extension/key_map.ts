import {
    Range,
    CompletionItemProvider,
    CompletionItem,
    CompletionItemKind,
} from 'vscode'

type Lists = [string, string, string][]
type Dicts = { [key: string]: string }

export let EscapedInputProvider: CompletionItemProvider = {
    async provideCompletionItems(document, position, token, context) {
        let range = new Range(position.translate(0, -1), position)
        let completions: Array<CompletionItem> = []
        for (const ac in operator_maps) {
            let to: string = operator_maps[ac]
            let item = new CompletionItem('\\' + ac, CompletionItemKind.Operator)
            item.detail = to
            item.range = range
            item.insertText = to
            completions.push(item)
        }
        for (const ac of constant_maps) {
            let item = new CompletionItem('\\' + ac[0], CompletionItemKind.Constant)
            item.detail = ac[2] + " " + ac[1]
            item.range = range
            item.insertText = ac[1]
            completions.push(item)
        }
        return completions
    },
}

const constant_maps: Lists = [
    ['empty', '∅', 'std::set::Empty'],
    ['mathbb{P}', 'ℙ', 'std::set::Prime'],
    ['mathbb{N}', 'ℕ', 'std::set::Nat'],
    ['mathbb{Z}', 'ℤ', 'std::set::Integer'],
    ['mathbb{Q}', 'ℚ', 'std::set::Q'],
    ['mathbb{R}', 'ℝ', 'std::set::Reals'],
    ['mathbb{C}', 'ℂ', 'std::set::Complex'],
]

const operator_maps: Dicts = {
    "`": "¯",
    "``": "¨",
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
