import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Tags, ITagsProps } from '@components/common/Tags/Tags';

type ContainerProps = RouteComponentProps & ITagsProps;

export const TagsContainer = withRouter(
  function ({history, ...props}: ContainerProps) {
    /**
     * Starts navigating to the tag page
     *
     * @param {React.MouseEvent<HTMLAnchorElement>} event
     * @returns {void}
     */
    function gotToTag(event: React.MouseEvent<HTMLAnchorElement>): void {
      history.push(event.currentTarget.href);
    }

    return (
      <Tags
        {...props}
        baseUrl="/search/q?="
        onClick={gotToTag}
      />
    );
  }
);
