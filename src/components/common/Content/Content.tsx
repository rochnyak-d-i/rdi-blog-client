import './content.css';

import React, { useState } from 'react';
import {
  EditorState, convertToRaw, convertFromRaw, RawDraftContentState
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import {
  plugins, AlignmentTool, InlineToolbar,
  AddVideoButton, AddImageButton
} from './plugins/plugins';

export interface IContentProps {
  content?: RawDraftContentState | null,
  onChange?: (rawContent: RawDraftContentState) => void,
  placeholder?: string,
  className?: string,
  editMode: boolean
};

const defaultProps = {
  placeholder: 'Input text',
  editMode: false
};

export function Content(props: IContentProps) {
  const [editorState, setEditorState] = useState(() => {
    return props.content
      ? EditorState.createWithContent(convertFromRaw(props.content))
      : EditorState.createEmpty()
  });

  /**
   * Event handler to the change content in editor
   *
   * @param {EditorState}  newEditorState
   * @returns void
   */
  function handleChange(newEditorState: EditorState) {
    setEditorState(newEditorState);

    if (props.editMode && props.onChange) {
      const newContent = newEditorState.getCurrentContent();
      const rawContent = convertToRaw(newContent);

      props.onChange(rawContent);
    }
  }

  return (
    <div className={props.className}>
      <Editor
        editorState={editorState}
        onChange={handleChange}
        plugins={plugins}

        placeholder={props.placeholder}
        stripPastedStyles={true}
        readOnly={!props.editMode}
      />
      <AlignmentTool />
      <InlineToolbar />

      <AddVideoButton
        editorState={editorState}
        onChange={handleChange}
      />
    </div>
  );
}
Content.defaultProps = defaultProps;
