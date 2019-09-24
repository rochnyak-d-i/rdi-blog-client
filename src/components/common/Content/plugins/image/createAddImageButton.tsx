import './add-image-button.css';

import React, { useState, useEffect } from "react";

export function createAddImageButton(imagePlugin) {
  return function AddImageButton(props) {
    const [open, toggleOpen] = useState(false);
    const [url, setUrl] = useState("https://youtu.be/HtjoJhPiXx8");

    let preventNextClose;

    function handlePopoverClick() {
      preventNextClose = true;
    }

    function closePopover() {
      if (!preventNextClose && open) {
        toggleOpen(false);
      }

      this.preventNextClose = false;
    }

    function openPopover() {
      if (!open) {
        preventNextClose = true;
        toggleOpen(true);
      }
    }

    function handleChangeUrl(event) {
      setUrl(event.target.value);
    }

    function addVideo() {
      const { editorState, onChange } = props;
      const newEditorState = imagePlugin.addVideo(editorState, { src: url });

      onChange(newEditorState);
    }

    useEffect(() => {
      document.addEventListener("click", closePopover);

      return () => {
        document.removeEventListener("click", closePopover);
      }
    });

    return (
      <div className="addVideo">
        <button
          className={open ? "addVideoPressedButton" : "addVideoButton"}
          onClick={openPopover}
          type="button"
        >
          +
        </button>
        <div
          className={open ? "addVideoPopover" : "addVideoClosedPopover"}
          onClick={handlePopoverClick}
        >
          <input
            type="text"
            placeholder="Paste the image url …"
            className="addVideoInput"
            onChange={handleChangeUrl}
            value={url}
          />
          <button
            className="addVideoConfirmButton"
            type="button"
            onClick={addVideo}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
