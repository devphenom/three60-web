import { BookmarkIcon, TodoIcon, NoteIcon } from '@icons';

export const NAV_ITEMS = [
  {
    exact: true,
    title: 'Todos',
    path: '/todos',
    icon: TodoIcon,
  },
  { exact: true, title: 'Notes', path: '/notes', icon: NoteIcon },
  { exact: true, title: 'Links', path: '/links', icon: BookmarkIcon },
];
