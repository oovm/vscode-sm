import {
    DocumentSelector,
    ExtensionContext,
} from 'vscode'
import * as vscode from 'vscode'
import { EscapedInputProvider } from "./key_map";
import { FormattingProvider } from "./formatter";

const selector: DocumentSelector = [
    { scheme: 'file', language: 'sm' },
    { scheme: 'untitled' },
]

export function activate(context: ExtensionContext) {
    vscode.languages.registerDocumentFormattingEditProvider(selector, FormattingProvider)
    vscode.languages.registerCompletionItemProvider(selector, EscapedInputProvider, '\\')
}
