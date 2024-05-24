import {
  directivesPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { VideoDirectiveDescriptor } from "./descriptors/video";
import { AudioDirectiveDescriptor } from "./descriptors/audio";
import { DiagramDirectiveDescriptor } from "./descriptors/diagram";
import {
  PdfDirectiveDescriptor,
  PresentationDirectiveDescriptor,
} from "./descriptors/pdf";
import { FileDirectiveDescriptor } from "./descriptors/file/FileDescriptor";
// import { TestDirectiveDescriptor } from "./descriptors/test/TestDescriptor";

export const plugins = [
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  imagePlugin(),
  directivesPlugin({
    directiveDescriptors: [
      VideoDirectiveDescriptor,
      AudioDirectiveDescriptor,
      DiagramDirectiveDescriptor,
      PdfDirectiveDescriptor,
      PresentationDirectiveDescriptor,
      FileDirectiveDescriptor,
      // TestDirectiveDescriptor,
    ],
  }),
];
