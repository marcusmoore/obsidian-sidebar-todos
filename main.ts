import {Plugin} from 'obsidian';
import {VIEW_SIDEBAR_TODOS, TodoView} from './view';

export default class SidebarTodos extends Plugin {
	async onload() {
		this.registerView(
			VIEW_SIDEBAR_TODOS,
			(leaf) => new TodoView(leaf)
		);

		this.addRibbonIcon('list-checks', 'Open Todos', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			this.activateView();
		});

		this.registerEvent(
			this.app.vault.on('modify', (file) => {
				if (file.path === this.app.workspace.getActiveFile()?.path) {
					(this.app.workspace.getLeavesOfType(VIEW_SIDEBAR_TODOS)[0].view as unknown as { writeContent: () => void }).writeContent();
				}
			})
		)

		this.registerEvent(
			this.app.workspace.on('active-leaf-change', (leaf) => {
				(this.app.workspace.getLeavesOfType(VIEW_SIDEBAR_TODOS)[0].view as unknown as { writeContent: () => void }).writeContent();
			})
		)
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
