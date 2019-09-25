import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Notification, INotificationTypes } from '../Notification';
import classes from '../classes';

const testData: Array<{
  id: number,
  type: INotificationTypes,
  message: string
}> = [
  {
    id: 1,
    message: 'Alarm',
    type: 'ERROR'
  },
  {
    id: 2,
    message: 'Be careful',
    type: 'WARNING'
  },
  {
    id: 3,
    message: 'Hello world!',
    type: 'INFO'
  },
  {
    id: 4,
    message: 'Done',
    type: 'SUCCESS'
  }
];

describe('Notification component', () => {
  let container: HTMLDivElement;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.append(container);
  });
  afterAll(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should show default info type', () => {
    act(() => {
      render(
        <Notification id={1} message="Hello!" />,
        container
      );
    });

    const nodes = container.getElementsByClassName(classes.itemInfo);

    expect(nodes).toHaveLength(1);
  });

  testData.forEach(({id, message, type}) => {
    it(`should show ${type} message`, () => {
      act(() => {
        render(
          <Notification id={id} type={type} message={message} />,
          container
        );
      });

      const messageNode = container.getElementsByClassName(classes.message)[0];

      expect(messageNode.textContent).toBe(message);
    });
  });

  it('should call handler close with param id', () => {
    const id = 1001;
    const handleClose = jest.fn();

    act(() => {
      render(
        <Notification id={id} message="Shut me" onClose={handleClose} />,
        container
      );
    });

    const button = container.getElementsByClassName(classes.close)[0];

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handleClose).toHaveBeenCalledWith(id);
  });
});
