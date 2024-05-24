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
    toolbarPlugin,
  } from "@mdxeditor/editor";
  import EditorToolbar from "../components/toolbar/EditorToolbar";
  import { VideoDirectiveDescriptor } from "./descriptors/video";
  import { AudioDirectiveDescriptor } from "./descriptors/audio";
  import { DiagramDirectiveDescriptor } from "./descriptors/diagram";
  import {
    PdfDirectiveDescriptor,
    PresentationDirectiveDescriptor,
  } from "./descriptors/pdf";
  import {FileDirectiveDescriptor} from "./descriptors/file/FileDescriptor";
  import {TestDirectiveDescriptor} from "./descriptors/test/TestDescriptor";
  
  export const plugins = (uploadImage: (image: File) => Promise<string>) => [
    toolbarPlugin({
      toolbarContents: EditorToolbar,
    }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    tablePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    imagePlugin({
      imageUploadHandler: uploadImage,
    }),
    directivesPlugin({
      directiveDescriptors: [
        VideoDirectiveDescriptor,
        AudioDirectiveDescriptor,
        DiagramDirectiveDescriptor,
        PdfDirectiveDescriptor,
        PresentationDirectiveDescriptor,
        FileDirectiveDescriptor,
        TestDirectiveDescriptor,
      ],
    }),
  ];
  