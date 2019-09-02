import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils'

import { Tags, ITags } from '../Tags';
import { tagsClassnames } from '../classnames';

describe('Tags component', () => {
  const tags: ITags = [
    {
      key: 'some-1',
      label: 'some 1'
    },
    {
      key: 'some-2',
      label: 'some 2'
    }
  ];
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should show the transmitted number of tags', () => {
    act(() => {
      render(
        <Tags tags={tags} />,
        container
      );
    });

    const inserted: number = container.querySelectorAll(
      `.${tagsClassnames.tag}`).length;

    expect(inserted).toBe(tags.length);
  });

  it('should default building correct link', () => {
    act(() => {
      render(
        <Tags
          tags={tags}
          baseUrl="/search/"
        />,
        container
      );
    });

    const firstLink: HTMLAnchorElement | null = container.querySelector(
      `.${tagsClassnames.tag}`);

    expect((firstLink as HTMLAnchorElement).getAttribute('href'))
      .toBe('/search/some-1');
  });

  it('should building correct link', () => {
    act(() => {
      render(
        <Tags
          tags={tags}
          linkBuilder={tag => `/search?q=${tag.key}`}
        />,
        container
      );
    });

    const firstLink: HTMLAnchorElement | null = container.querySelector(
      `.${tagsClassnames.tag}`);

    expect((firstLink as HTMLAnchorElement).getAttribute('href'))
      .toBe('/search?q=some-1');
  });

  it('should navigate when clicked', () => {
    const mock = jest.fn();

    act(() => {
      render(
        <Tags
          tags={tags}
          baseUrl="/search/"
          onClick={mock}
        />,
        container
      );

      const firstLink: HTMLAnchorElement | null = container.querySelector(
        `.${tagsClassnames.tag}`);

      act(() => {
        (firstLink as HTMLAnchorElement)
          .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(mock).toHaveBeenCalled();
    });
  });
});
