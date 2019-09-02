import React from 'react';
import { HeadlinesPicker } from './HeadlinesPicker';

export function HeadlinesButton(props) {
  function handleMouseDown(event) {
    event.preventDefault();
  }

  function handleClick() {
    props.onOverrideContent(HeadlinesPicker);
  }

  return (
    <div onMouseDown={handleMouseDown} className="headlineButtonWrapper">
      <button onClick={handleClick} className="headlineButton">
        H
      </button>
    </div>
  );
}
