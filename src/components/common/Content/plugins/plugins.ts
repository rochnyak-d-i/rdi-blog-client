import { composeDecorators } from 'draft-js-plugins-editor';

import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';

import { createInlineToolbarWitButtons } from './toolbar/createInlineToolbarWithButtons';
import { createAddVideoButton } from './video/createAddVideoButton';
import { createAddImageButton } from './image/createAddImageButton';

import 'draft-js/dist/Draft.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

const blockDndPlugin = createBlockDndPlugin();
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const resizeablePlugin = createResizeablePlugin();
const linkPlugin = createLinkPlugin({});
const inlineToolbarPlugin = createInlineToolbarPlugin();
const imagePlugin = createImagePlugin({
  decorator: composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
  )
});
const videoPlugin = createVideoPlugin({
  decorator: composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator
  )
});

export const plugins = [
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  linkPlugin,
  inlineToolbarPlugin,
  imagePlugin,
  videoPlugin
];

export const AlignmentTool = alignmentPlugin.AlignmentTool;
export const InlineToolbar = createInlineToolbarWitButtons(
  inlineToolbarPlugin.InlineToolbar,
  linkPlugin.LinkButton
);
export const AddVideoButton = createAddVideoButton(videoPlugin);
export const AddImageButton = createAddImageButton(imagePlugin);
