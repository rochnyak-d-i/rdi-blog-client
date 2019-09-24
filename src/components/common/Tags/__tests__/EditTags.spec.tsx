import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import { tagsClassnames } from '../classes';
import { ITags } from '../Tags';
import { EditTags } from '../EditTags';

describe('EditTags component', () => {
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
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    unmountComponentAtNode(container);
  });

  describe('should add tag', () => {
    let onChange: any;
    let input: HTMLInputElement | null = null;

    beforeEach(() => {
      onChange = jest.fn();

      act(() => {
        render(
          <EditTags tags={tags} onChange={onChange} />,
          container
        );
      });

      input = container.querySelector(`.${tagsClassnames.create}`);
    });

    afterEach(() => {
      input = null;
    });

    it('have input', () => {
      expect(input).not.toBeNull();
    });

    it('called', () => {
      act(() => {
        Simulate.keyDown((input as HTMLInputElement), {
          keyCode: 13
        });
      });

      expect(onChange).toBeCalled();
    });

    it('called with correct args', () => {
      act(() => {
        Simulate.change((input as HTMLInputElement), {
          target: ({
            value: 'some 3'
          } as HTMLInputElement)
        });
      });

      act(() => {
        Simulate.keyDown((input as HTMLInputElement), {
          keyCode: 13
        });
      });

      const newTags = onChange.mock.calls[0][0];

      expect(newTags).toHaveLength(3);
      expect(newTags[2]).toEqual({
        key: 'some-3',
        label: 'some 3'
      });
    });
  });

  it('should remove tag', () => {
    const onChange = jest.fn();

    render(
      <EditTags tags={tags} onChange={onChange} />,
      container
    );

    const removeButton: HTMLButtonElement | null = container.querySelector(
      `.${tagsClassnames.remove}`);

    act(() => {
      Simulate.click((removeButton as HTMLButtonElement));
    });

    const newTags = onChange.mock.calls[0][0];

    expect(newTags).toHaveLength(1);
    expect(newTags[0]).toEqual({
      key: 'some-2',
      label: 'some 2'
    });
  });
});
