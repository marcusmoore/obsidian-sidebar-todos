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
