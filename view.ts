import {ItemView, WorkspaceLeaf} from "obsidian";
import {getAPI} from "obsidian-dataview";
import {Grouping} from "obsidian-dataview/lib/data-model/value";
import {SListItem} from "obsidian-dataview/lib/data-model/serialized/markdown";

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
		this.writeContent();
	}

	writeContent() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", {text: ""});

		const rootEl = document.createElement('div');

		const path = app.workspace.getActiveFile()?.path

		if (!path) {
			return;
		}

		const page = api?.page(path);

		const tasks = page?.file.tasks.where(t => !t.completed);

		if (tasks?.length === 0) {
			rootEl.createDiv()
				.createSpan({cls: 'title'})
				.setText("No uncompleted tasks");

			container.appendChild(rootEl);

			return;
		}

		api?.taskList(
			tasks as Grouping<SListItem>,
			false,
			rootEl,
			this
		);

		container.appendChild(rootEl);
	}

	async onClose() {
		// Nothing to clean up.
	}
}
