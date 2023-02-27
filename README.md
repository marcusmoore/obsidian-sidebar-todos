# Sidebar Todos

Puts the current note's todos in the sidebar.

# Todo
- [x] Only show uncompleted todos
- [x] Reference the current note dynamically
- [ ] Have the note update when a todo is updated
  - `useEffect()` as mentioned in the db-folder links below? 
- [ ] Have the side panel update when file is changed
- [ ] Write nice message if there are no todos to display
- [ ] [Update icon](https://marcus.se.net/obsidian-plugin-docs/user-interface/icons)

# References
- [How obsidian-db-folder writes tasks](https://github.com/RafaelGB/obsidian-db-folder/blob/f14529049933c0802c41366778dbec38858f4d7c/src/components/cellTypes/TaskCell.tsx#L36)
- [Author of obsidian-db-folder asking about writing tasks](https://github.com/blacksmithgu/obsidian-dataview/discussions/1351)
- [Obsidian TypeScript API | Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/reference/typescript)
- [Codeblock Reference - Dataview](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)


# ScratchPad
For updating the current note we'll probably need to watch for an [Event](https://marcus.se.net/obsidian-plugin-docs/events). Perhaps one of the following:
```javascript
this.app.workspace.on('file-open')
this.app.workspace.on('active-leaf-change')
```

For referencing the view dynamically we might find help in the comments about `activateView()` at the bottom of the following page: [Views | Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/user-interface/views)
