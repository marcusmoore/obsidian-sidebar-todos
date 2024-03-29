# Sidebar Todos

Puts the current note's todos in the sidebar.

# Todo
- [x] Only show uncompleted todos
- [x] Reference the current note dynamically
- [x] Write nice message if there are no todos to display
- [x] Have the side panel update when file is changed
- [ ] Have the note update when a todo is updated
  - [ ] Figure out panel contents flickering (at least when trying setInterval). The GitHub discussion might be relevant.
- [x] [Update icon](https://marcus.se.net/obsidian-plugin-docs/user-interface/icons)

# References
- [How obsidian-db-folder writes tasks](https://github.com/RafaelGB/obsidian-db-folder/blob/f14529049933c0802c41366778dbec38858f4d7c/src/components/cellTypes/TaskCell.tsx#L36)
- [Author of obsidian-db-folder asking about writing tasks](https://github.com/blacksmithgu/obsidian-dataview/discussions/1351)
- [Obsidian TypeScript API | Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/reference/typescript)
- [Codeblock Reference - Dataview](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)
- [Obsidian Events](https://marcus.se.net/obsidian-plugin-docs/events)
  - `editor-change` is triggered on every keystroke...
- [Views | Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/user-interface/views)
- [attach a new view to the sidebar - Liam Cain](https://liamca.in/Obsidian/API+FAQ/views/attach+a+new+view+to+the+sidebar)
  - [liamcain/obsidian-calendar-plugin: Simple calendar widget for Obsidian.](https://github.com/liamcain/obsidian-calendar-plugin)
