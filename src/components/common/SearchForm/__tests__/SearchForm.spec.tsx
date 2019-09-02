import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { SearchForm, ISubmitHandlerProps } from '../SearchForm';

describe("SearchForm component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  describe('visual', () => {
    it('should initialized with the correct default value', () => {
      const testPhrase = 'test phrase';

      act(() => {
        render(
          <SearchForm path="/" initValue={testPhrase} />,
          container
        );
      });

      const input: HTMLInputElement = container.querySelectorAll('input')[0];
      expect(input.value).toBe(testPhrase);
    });

    it('should concat form classname', () => {
      const className = 'test-class';

      act(() => {
        render(
          <SearchForm path="/" formClassName={className} />,
          container
        );
      });

      const form: HTMLFormElement = container.querySelectorAll('form')[0];
      expect(form.classList.value).toContain(className);
    });

    it('should concat input classname', () => {
      const className = 'test-class';

      act(() => {
        render(
          <SearchForm path="/" inputClassName={className} />,
          container
        );
      });

      const input: HTMLInputElement = container.querySelectorAll('input')[0];
      expect(input.classList.value).toContain(className);
    });

    it('should concat button classname', () => {
      const className = 'test-class';

      act(() => {
        render(
          <SearchForm path="/" buttonClassName={className} />,
          container
        );
      });

      const button: HTMLButtonElement = container.querySelectorAll('button')[0];
      expect(button.classList.value).toContain(className);
    });
  });

  describe('behaviour', () => {
    it('should change search input', () => {
      act(() => {
        render(
          <SearchForm path="/" />,
          container
        );
      });

      const input: HTMLInputElement = container.querySelectorAll('input')[0];

      act(() => {
        Simulate.change(input, {
          target: ({
            value: 'qwe'
          } as HTMLInputElement)
        });
      });

      expect(input.value).toBe('qwe');
    });

    it('should handle submit event', () => {
      const mock = jest.fn();

      act(() => {
        render(
          <SearchForm path="/" onSubmit={mock} />,
          container
        );
      });

      const button: HTMLButtonElement = container.querySelectorAll("button")[0];

      act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(mock).toHaveBeenCalled();
    });

    it('should handle submit event with currently param', () => {
      const method = 'GET';
      const path = '/search';
      const query = 'search phrase';
      const name = 'query';
      const mock = jest.fn();
      const neededArg: ISubmitHandlerProps = {method, path, query, name};

      act(() => {
        render(
          <SearchForm
            method={method}
            path={path}
            initValue={query}
            name={name}
            onSubmit={mock}
          />,
          container
        );
      });

      const button: HTMLButtonElement = container.querySelectorAll("button")[0];

      act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(mock).toBeCalledWith(neededArg);
    });
  });
});
