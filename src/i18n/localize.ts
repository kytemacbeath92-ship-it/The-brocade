import {
  articles,
  categories,
  categoryById,
  guidedPaths,
  intro,
  type Article,
  type Category,
  type GuidedPath,
} from '@/data/articles';
import { ARTICLE_L10N } from '@/i18n/articles-l10n';
import { CATEGORY_L10N, INTRO_L10N, PATH_L10N } from '@/i18n/content-l10n';
import type { LanguageCode } from '@/i18n/languages';

export function localizeIntro(lang: LanguageCode): { title: string; body: string[] } {
  if (lang === 'en') return intro;
  return INTRO_L10N[lang] ?? intro;
}

export function localizeArticle(article: Article, lang: LanguageCode): Article {
  if (lang === 'en') return article;
  const loc = ARTICLE_L10N[lang]?.[article.id];
  if (!loc) return article;
  return { ...article, title: loc.title, body: loc.body };
}

export function localizeArticles(lang: LanguageCode): Article[] {
  return articles.map((a) => localizeArticle(a, lang));
}

export function localizeCategory(id: Category['id'], lang: LanguageCode): Category {
  const base = categoryById.get(id)!;
  if (lang === 'en') return base;
  const loc = CATEGORY_L10N[lang]?.[id];
  if (!loc) return base;
  return { ...base, name: loc.name, blurb: loc.blurb };
}

export function localizeCategories(lang: LanguageCode): Category[] {
  return categories.map((c) => localizeCategory(c.id, lang));
}

export function localizePath(path: GuidedPath, lang: LanguageCode): GuidedPath {
  if (lang === 'en') return path;
  const loc = PATH_L10N[lang]?.[path.id];
  if (!loc) return path;
  return { ...path, name: loc.name, blurb: loc.blurb };
}

export function localizePaths(lang: LanguageCode): GuidedPath[] {
  return guidedPaths.map((p) => localizePath(p, lang));
}
