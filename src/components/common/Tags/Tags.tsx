import './assets/tags.css';

import React from 'react';
import { tagsClassnames } from './classes';

export interface ITag {
  key: string,
  label: string
}
export type ITags = Array<ITag>;
export interface ITagsProps {
  tags: ITags,
  baseUrl?: string,
  linkBuilder?: (tag: ITag, baseUrl: string) => string,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Default link builder. Building a link for each tag.
 *
 * @param {ITag}    tag
 * @param {string}  baseUrl
 * @returns {string}
 */
function defLinkBuilder(tag: ITag, baseUrl: string): string {
  return baseUrl + tag.key;
}

/**
 * Component for showing tags
 */
export function Tags({
  tags,
  baseUrl = '/',
  linkBuilder = defLinkBuilder,
  onClick
}: ITagsProps) {
  /**
   * Handler event for click in tag
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} event
   * @returns {void}
   */
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      event.preventDefault();

      onClick(event);
    }
  }

  return (
    <div className={tagsClassnames.root}>
      {tags.map(tag => (
        <a
          key={tag.key}
          className={tagsClassnames.tag}
          href={linkBuilder(tag, baseUrl)}
          onClick={handleClick}
        >
          {tag.label}
        </a>
      ))}
    </div>
  );
}
