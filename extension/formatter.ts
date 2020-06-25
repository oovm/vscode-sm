import {
    DocumentFormattingEditProvider,
    TextEdit,
    Range
} from 'vscode'


export let FormattingProvider: DocumentFormattingEditProvider = {
    async provideDocumentFormattingEdits(document, position, token) {
        const text = document.getText()
        const start = document.lineAt(0).range.start
        const end = document.lineAt(document.lineCount - 1).range.end
        const r = new Range(start, end)
        return [TextEdit.replace(r, text)]
    },
}
