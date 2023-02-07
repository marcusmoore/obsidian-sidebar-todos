import { ItemView, WorkspaceLeaf } from "obsidian";

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
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "Hello there...I'm over here..." });
  }

  async onClose() {
    // Nothing to clean up.
  }
}