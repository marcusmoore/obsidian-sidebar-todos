import {App, Editor, MarkdownView, Modal, Plugin} from 'obsidian';
import {VIEW_SIDEBAR_TODOS, TodoView} from './view';

// Remember to rename these classes and interfaces!
export default class MyPlugin extends Plugin {
	async onload() {
		this.registerView(
			VIEW_SIDEBAR_TODOS,
			(leaf) => new TodoView(leaf)
		);

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Activate View', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			this.activateView();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		this.registerEvent(
			this.app.vault.on('modify', (file) => {
				if (file.path === this.app.workspace.getActiveFile()?.path) {
					// reload the view without taking away focus from the editor
					this.activateView(false);
				}
			})
		)

		// this.registerEvent(
		// 	this.app.workspace.on('active-leaf-change', (leaf) => {
		// 		this.activateView(false);
		// 	})
		// )
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_SIDEBAR_TODOS);
	}

	async activateView(active = true) {
		this.app.workspace.detachLeavesOfType(VIEW_SIDEBAR_TODOS);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_SIDEBAR_TODOS,
			active: active,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_SIDEBAR_TODOS)[0]
		);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
