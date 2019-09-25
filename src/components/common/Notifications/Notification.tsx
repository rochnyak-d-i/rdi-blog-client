import './assets/notification.css';

import React, { useCallback } from 'react';
import classNames from 'classnames';
import { noop } from '@utils/helpers/noop';

import classes from './classes';
import ErrorIcon from './assets/error.svg';
import WarningIcon from './assets/warning.svg';
import InfoIcon from './assets/info.svg';
import SuccessIcon from './assets/success.svg';

export type INotificationTypes = 'ERROR' | 'WARNING' | 'INFO' | 'SUCCESS';
export interface INotification {
  id: number,
  message: string,
  type?: INotificationTypes
}
export type ICloseHandler = (id: number) => void;
export type INotificationProps = INotification & {
  onClose?: ICloseHandler,
  buttonLabel?: string
}

/**
 * Props for notification by type
 */
const propsByType: Record<INotificationTypes, {
  className: string,
  role: string,
  ariaLive: React.AriaAttributes['aria-live'],
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}> = {
  ERROR: {
    className: classes.itemError,
    role: 'alert',
    ariaLive: 'assertive',
    IconComponent: ErrorIcon
  },
  WARNING: {
    className: classes.itemWarning,
    role: 'alert',
    ariaLive: 'assertive',
    IconComponent: WarningIcon
  },
  INFO: {
    className: classes.itemInfo,
    role: 'status',
    ariaLive: 'polite',
    IconComponent: InfoIcon
  },
  SUCCESS: {
    className: classes.itemSuccess,
    role: 'status',
    ariaLive: 'polite',
    IconComponent: SuccessIcon
  }
};

export function Notification({
  id,
  message,
  type = 'INFO',
  onClose = noop,
  buttonLabel = 'Close'
}: INotificationProps) {
  const {className, role, ariaLive, IconComponent} = propsByType[type];
  /**
   * Event handler to the click button close
   *
   * @returns void
   */
  const handleClose = useCallback(() => onClose(id), [id, onClose]);

  return (
    <div
      className={classNames(classes.item, className)}
      role={role}
      aria-live={ariaLive}
    >
      <IconComponent className={classes.icon} />

      <div className={classes.message}>{message}</div>

      <button
        className={classes.close}
        type="button"
        aria-label={buttonLabel}
        onClick={handleClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
