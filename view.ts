import {ItemView, WorkspaceLeaf} from "obsidian";
import {getAPI} from "obsidian-dataview";
import {MarkdownRenderChild} from "obsidian";

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

		const page = api?.page('Untitled.md');

		const rootEl = document.createElement('div');

		// const taskComponent = new MarkdownRenderChild(rootEl);

		// https://github.com/RafaelGB/obsidian-db-folder/blob/f14529049933c0802c41366778dbec38858f4d7c/src/components/cellTypes/TaskCell.tsx#L36
		// https://github.com/blacksmithgu/obsidian-dataview/discussions/1351
		api?.taskList(
			page?.file.tasks,
			false,
			rootEl,
			this
		)

		const container = this.containerEl.children[1];
		container.appendChild(rootEl)
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
