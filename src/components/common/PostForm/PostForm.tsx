import React, { useState } from 'react';
import { RawDraftContentState } from 'draft-js';
import { Content } from '@components/common/Content/Content';
import { ITags } from '@components/common/Tags/Tags';
import { EditTags } from '@components/common/Tags/EditTags';
import { IPostProps } from '@components/common/Post/Post'
import { postFormClassNames } from './classnames';

import './post-form.css';

export interface ISubmitMeta {
  action: string,
  method: string
}
export interface IPostFormProps {
  action?: string,
  method?: string,
  onSubmit?: (submitProps: IPostProps, meta: ISubmitMeta) => void,
  submitLabel?: string,
  disabled?: boolean
}

export function PostForm({
  action = '/',
  method = 'POST',
  onSubmit,
  submitLabel = 'Save',
  disabled = false
}: IPostFormProps) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState<RawDraftContentState | null>(null);
  const [tags, setTags] = useState<ITags>([]);

  /**
   * Event handler to the change label
   *
   * @param {React.ChangeEvent<HTMLInputElement>}  event
   * @returns void
   */
  function handleChangeLabel(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = event.target.value;

    setLabel(value);
  }

  /**
   * Event handler to the change description
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>}  event
   * @returns void
   */
  function handleChangeDescription(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    const value = event.target.value;

    setDescription(value);
  }

  /**
   * Event handler to the submit form
   *
   * @param {React.FormEvent<HTMLFormElement>}  event
   * @returns {void}
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    if (!onSubmit) {
      return;
    }

    event.preventDefault();

    onSubmit({
      label,
      description,
      content,
      tags
    }, {
      action,
      method
    });
  }

  return (
    <form
      className={postFormClassNames.root}
      action={action}
      method={method}
      onSubmit={handleSubmit}
    >
      <label className={postFormClassNames.label}>
        Заголовок:
        <input
          className={postFormClassNames.input}
          name="title"
          value={label}
          onChange={handleChangeLabel}
          disabled={disabled}
        />
      </label>

      <label className={postFormClassNames.label}>
        Описание:
        <textarea
          className={postFormClassNames.textarea}
          name="description"
          value={description}
          onChange={handleChangeDescription}
          disabled={disabled}
        />
      </label>

      <Content
        editMode={!disabled}
        className={postFormClassNames.editor}
        placeholder="Введите текст"
        content={content}
        onChange={setContent}
      />

      <EditTags tags={tags} onChange={setTags} disabled={disabled} />

      <button
        type="submit"
        className={postFormClassNames.submit}
        disabled={disabled}
      >
        {submitLabel}
      </button>
    </form>
  );
}
