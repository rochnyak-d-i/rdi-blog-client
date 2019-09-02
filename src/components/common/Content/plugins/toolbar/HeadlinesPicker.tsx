import React, { useEffect } from 'react';
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton
} from 'draft-js-buttons';

const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];

export function HeadlinesPicker(props) {
  function handleWindowClick() {
    props.onOverrideContent(undefined);
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('click', handleWindowClick);
    }, 0);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    }
  }, []);

  return (
    <div>
      {buttons.map((Button, i) => <Button key={i} {...props} />)}
    </div>
  );
}
