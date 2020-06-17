import {
    ExtensionContext,
} from 'vscode'
import * as vscode from 'vscode'
import { EscapedInputProvider } from "./key_map";

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

    // 👍 auto complete using API
    vscode.languages.registerCompletionItemProvider(
        [
            { scheme: 'file', language: 'sm' },
            { scheme: 'untitled' },
        ],
        EscapedInputProvider,
        '\\',
    )
}
