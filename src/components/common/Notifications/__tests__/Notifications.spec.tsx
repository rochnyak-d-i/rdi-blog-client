import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Notifications, INotifications } from '../Notifications';
import classes from '../classes';

describe('Notifications component.', () => {
  const notifications: INotifications = [
    {
      id: 1000,
      type: 'WARNING',
      message: 'Some warning'
    },
    {
      id: 800,
      type: 'ERROR',
      message: 'Some error!'
    },
    {
      id: 801,
      type: 'ERROR',
      message: 'Some error number two!'
    },
    {
      id: 100,
      type: 'INFO',
      message: 'Some info'
    },
    {
      id: 110,
      message: 'Some info two'
    },
    {
      id: 9,
      type: 'SUCCESS',
      message: 'Done!'
    }
  ];

  let container: HTMLDivElement;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterAll(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should show all notifications', () => {
    act(() => {
      render(
        <Notifications notifications={notifications} onClose={() => {}} />,
        container
      );
    });

    const rootNodes = container.getElementsByClassName(classes.root);
    const notifNodes = container.getElementsByClassName(classes.item);

    expect(rootNodes).toHaveLength(1);
    expect(notifNodes).toHaveLength(notifications.length);
  });

  it('should show notifications in the specified order', () => {
    act(() => {
      render(
        <Notifications notifications={notifications} onClose={() => {}} />,
        container
      );
    });

    const notifNodes = container.getElementsByClassName(classes.item);

    notifications.forEach((notification, index) => {
      const message = notifNodes[index]
        .getElementsByClassName(classes.message)[0]
        .textContent;

      expect(message).toBe(notification.message);
    });
  });

  it('should call the close handler with a valid param', () => {
    const handleClose = jest.fn();

    act(() => {
      render(
        <Notifications notifications={notifications} onClose={handleClose} />,
        container
      );
    });

    const closeButtons = container.getElementsByClassName(classes.close);

    notifications.forEach((notification, index) => {
      const closeButton = closeButtons[index];

      act(() => {
        closeButton.dispatchEvent(
          new MouseEvent('click', { bubbles: true }));
      });

      expect(handleClose).toHaveBeenLastCalledWith(notification.id);
    });
  });
});
