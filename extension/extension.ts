import {
    ExtensionContext,
    Range,
    CompletionItemProvider,
    CompletionItem,
    CompletionItemKind,
    TextEdit,
} from 'vscode'
import * as vscode from 'vscode'
import { key_maps } from './key_map'

export function activate(context: ExtensionContext) {
    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('sm', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const text = document.getText()
            const start = document.lineAt(0).range.start
            const end = document.lineAt(document.lineCount - 1).range.end
            const r = new vscode.Range(start, end)
            return [vscode.TextEdit.replace(r, text)]
        },
    })

    let EscapedInputProvider: CompletionItemProvider = {
        async provideCompletionItems(document, position, token, context) {
            let range = new Range(position.translate(0, -1), position)
            let completions: Array<CompletionItem> = []
            for (const from in key_maps) {
                let item = new CompletionItem('\\' + from)
                item.detail = key_maps[from]
                item.kind = CompletionItemKind.Operator
                item.textEdit = TextEdit.replace(range, to)
                completions.push(item)
            }

            return completions
        },
    }

    vscode.languages.registerCompletionItemProvider(
        [
            { scheme: 'file', language: 'sm' },
            { scheme: 'untitled' },
        ],
        EscapedInputProvider,
        '\\',
    )
}
