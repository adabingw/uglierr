const vscode = require('vscode');

function activate(context) {

	let disposable = vscode.commands.registerCommand('uglierr.watdat', function () {
		vscode.window.showInformationMessage('u asked for it!');

		const { activeTextEditor } = vscode.window;

		if (activeTextEditor) {
			const { document } = activeTextEditor;

			const edit = new vscode.WorkspaceEdit();
			const doc = []
			for (let i = 0; i < document.lineCount; i++) {
				let text = document.lineAt(i).text;
				doc.push(text);
				let a = ' '.repeat(Math.floor(Math.random() * 20))	
				console.log(a);
				if (text[text.length - 1] == ';' && Math.random() < 0.5) {
					edit.delete(document.uri, new vscode.Range(new vscode.Position(i, document.lineAt(i).range.end.character - 1), document.lineAt(i).range.end))
				}		
				edit.insert(document.uri, document.lineAt(i).range.start, a);
			}
			vscode.workspace.applyEdit(edit);
			
			// vscode.window.showInformationMessage('looks gnarly, wanna keep it?', ...["TAKE ME BACK", 'tehe i like it']).then((item)=>{
			// 	if (item == "TAKE ME BACK") {
			// 		const { document } = activeTextEditor;
			// 		for (let i = 0; i < doc.length; i++) {
			// 			edit.replace(document.uri, document.lineAt(i).range, i.toString());
			// 		}
			// 		vscode.workspace.applyEdit(edit);
			// 	}
			// });
			return vscode.workspace.applyEdit(edit);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
