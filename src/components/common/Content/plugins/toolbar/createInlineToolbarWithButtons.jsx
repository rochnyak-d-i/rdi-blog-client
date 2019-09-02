import React from 'react';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import { HeadlinesButton } from './HeadlinesButton';

export function createInlineToolbarWitButtons(InlineToolbar, LinkButton) {
  function InlineToolbarWithButtons() {
    return (
      <InlineToolbar>
        {(externalProps) => (
          <div>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <HeadlinesButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
            <LinkButton {...externalProps} />
          </div>
        )}
      </InlineToolbar>
    );
  }

  return InlineToolbarWithButtons;
}
