import {ItemView, WorkspaceLeaf} from "obsidian";
import {getAPI} from "obsidian-dataview";

const api = getAPI();

export const VIEW_SIDEBAR_TODOS = "example-view";

export class TodoView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_SIDEBAR_TODOS;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {

		let path = app.workspace.getActiveFile()?.path

		const page = api?.page(path);

		const rootEl = document.createElement('div');

		api?.taskList(
			page?.file.tasks.where(t => !t.completed),
			false,
			rootEl,
			this
		);

		this.containerEl.children[1].appendChild(rootEl);
	}

	private writeDefaultText() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", {text: "Hello there...I'm over here..."});

		const rootEl = document.createElement('div');

		rootEl.createDiv()
			.createSpan({cls: 'title'})
			.setText("Oh hi...");

		container.appendChild(rootEl);
	}

	async onClose() {
		// Nothing to clean up.
	}
}
