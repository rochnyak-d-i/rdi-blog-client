import React, { useState } from 'react';
import { ITag, ITags } from './Tags';
import { tagsClassnames } from './classnames';

import CloseIcon from './assets/close.svg';
import './assets/tags.css';

/**
 * @type  {number}  enter key code
 */
const ENTER: number = 13;

export interface IEditTagsProps {
  tags: ITags,
  onChange: (tags: ITags) => void
}

/**
 * Transform tag label to tag key.
 *
 * @param {string}  label   tag label
 * @retusn  {string}
 */
function labelToKey(label: string): string {
  return label.replace(/\s/g, '-');
}

/**
 * Component for editing tags
 */
export function EditTags(props: IEditTagsProps) {
  const [newTagLabel, setNewTagLabel] = useState('');

  /**
   * Create handler event for click button on remove button
   *
   * @param {ITag}  tag
   * @returns {Function}
   */
  function createHandleRemoveTag(tag: ITag) {
    return function handleRemoveTag(): void {
      const tags = props.tags.filter(cTag => cTag.key !== tag.key);

      props.onChange(tags);
    };
  }

  /**
   * Event handler to the change label for new tag
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @returns {void}
   */
  function handleChangeNewTagLabel(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = event.target.value;

    setNewTagLabel(value);
  }

  /**
   * Event handler to the keydown in new tag
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   * @returns {void}
   */
  function handleKeyDownNewTagLabel(
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    // press enter
    if (event.keyCode === ENTER) {
      event.preventDefault();

      const tags = props.tags.concat({
        key: labelToKey(newTagLabel),
        label: newTagLabel
      });

      props.onChange(tags);
    }
  }

  return (
    <div className={tagsClassnames.root}>
      {props.tags.map(tag => (
        <span key={tag.key} className={tagsClassnames.tag}>
          {tag.label}
          &nbsp;

          <button
            type="button"
            className={tagsClassnames.remove}
            onClick={createHandleRemoveTag(tag)}
          >
            <CloseIcon />
          </button>
        </span>
      ))}

      <input
        className={tagsClassnames.create}
        name="create-tag"
        value={newTagLabel}
        onChange={handleChangeNewTagLabel}
        onKeyDown={handleKeyDownNewTagLabel}
      />
    </div>
  );
}
export { ITags };
