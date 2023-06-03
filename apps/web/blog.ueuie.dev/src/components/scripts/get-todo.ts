import type { Lang } from '~/utils/i18n';

export interface Todo {
  name: string;
  action: string;
}

const todos: Record<Lang, Todo[]> = {
  en: [
    {
      name: 'git the neares gym in your area',
      action: 'https://www.google.com/maps/search/gym',
    },
    {
      name: 'keep up with groceries',
      action: 'https://www.google.com/maps/search/supermarket',
    },
    {
      name: 'watch the latest season of Mushokou Tensei',
      action: 'https://www.crunchyroll.com/de/series/G24H1N3MP/mushoku-tensei-jobless-reincarnation',
    },
    {
      name: 'learn new languages',
      action: 'https://www.youtube.com/watch?v=ZJ0zJDz1G1M',
    },
    {
      name: 'better your vocals',
      action: 'https://www.youtube.com/watch?v=Vq9dX8z4_Kw',
    },
  ],
  ua: [
    {
      name: 'git the neares gym in your area',
      action: 'https://www.google.com/maps/search/gym',
    },
    {
      name: 'keep up with groceries',
      action: 'https://www.google.com/maps/search/supermarket',
    },
    {
      name: 'watch the latest season of Mushokou Tensei',
      action: 'https://www.crunchyroll.com/de/series/G24H1N3MP/mushoku-tensei-jobless-reincarnation',
    },
    {
      name: 'learn new languages',
      action: 'https://www.youtube.com/watch?v=ZJ0zJDz1G1M',
    },
    {
      name: 'better your vocals',
      action: 'https://www.youtube.com/watch?v=Vq9dX8z4_Kw',
    },
  ],
};

export function getTodos(count: number, lang: Lang) {
  return Array.from(new Set(todos[lang]))
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
