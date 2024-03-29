// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as converter from './converter';

// this method is called when your extension is deactivated
export function deactivate() { }

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "oracleguidconverter" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('oracleguidconverter.convert', async () => {
		let guid = "";
		let fromEditor = true;
		const editor = vscode.window.activeTextEditor;

		let inputGuids: string[] = await getGuidsToConvert(editor);
		let convertedGuids = await convertGuids(inputGuids);
		outputResult(convertedGuids);
	});

	context.subscriptions.push(disposable);
}

async function getGuidsToConvert(editorr: vscode.TextEditor | undefined): Promise<string[]> {
	let inputGuids: string[] = new Array();
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		const selection = editor.selection;
		const text = document.getText(selection);

		if(text) {
			inputGuids = text.split(/[\r\n]+/);
		}
	}

	if (inputGuids.length === 0) {
		const input = await vscode.window.showInputBox({
			placeHolder: 'Enter guid that you wish to convert',
			validateInput: text => {
				const valid = (text.length === 32 || text.length === 36);
				return !valid ? 'Not valid GUID/UUID' : null;
			}
		});

		if (input) {
			inputGuids.push(input);
		} else {
			vscode.window.showInformationMessage(`No valid GUID/UUID passed.`);
		}
	}

	return inputGuids;
};

async function convertGuids(inputGuids: string[]): Promise<string[]> {
	return inputGuids.map(guid => {
		if(guid.length === 32) {
			return converter.convertToNet(guid);
		}

		if(guid.length === 36) {
			return converter.convertToRaw(guid);
		}

		return guid;
	});
};

async function outputResult(convertedGuids: string[]) {
	const editor = vscode.window.activeTextEditor;
	let converted = convertedGuids.join("\n");

	if (editor) {//&& fromEditor) {
		const selection = editor.selection;

		if(selection) {
			editor.edit(editBuilder => {
				editBuilder.replace(selection, converted);
			});
		}
	}

	await vscode.env.clipboard.writeText(converted);
	vscode.window.showInformationMessage(`Converted to '${converted}' and put to clipboard.`);
}
