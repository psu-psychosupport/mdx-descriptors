import * as Dialog from "@radix-ui/react-dialog";
import * as RadixToolbar from "@radix-ui/react-toolbar";

import React, { useRef } from "react";

import classNames from "classnames";
import styles from "../../../styles/main.module.css";
import {
  TooltipWrap,
  editorRootElementRef$,
  iconComponentFor$,
  readOnly$,
} from "@mdxeditor/editor";
import { useCellValue, useCellValues } from "@mdxeditor/gurx";

export interface IDialogSubmit {
  file: FileList;
}

export const FileDialog = React.forwardRef<
  HTMLButtonElement,
  {
    /**
     * The callback to call when the dialog is submitted. The callback receives the value of the text input as a parameter.
     */
    onSubmit: (data: IDialogSubmit) => void;
    /**
     * The title to show in the tooltip of the toolbar button.
     */
    tooltipTitle: string;
    /**
     * The contents of the button. Usually an icon.
     * @example
     * ```tsx
     * <DialogButton buttonContent={<CustomIcon />} />
     * ```
     */
    buttonContent?: React.ReactNode;
    /**
     * The title of the submit button.
     */
    submitButtonTitle: string;
    uploadFileTitle: string;
    acceptFileTypes: string;
  }
>(
  (
    {
      submitButtonTitle,
      uploadFileTitle,
      onSubmit,
      tooltipTitle,
      buttonContent,
      acceptFileTypes,
    },
    forwardedRef,
  ) => {
    const [editorRootElementRef, readOnly] = useCellValues(
      editorRootElementRef$,
      readOnly$,
    );
    const [open, setOpen] = React.useState(false);

    const onSubmitCallback = React.useCallback(
      (data: IDialogSubmit) => {
        onSubmit(data);
        setOpen(false);
      },
      [onSubmit],
    );

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <RadixToolbar.Button
            className={styles.toolbarButton}
            ref={forwardedRef}
            disabled={readOnly}
          >
            <TooltipWrap title={tooltipTitle}>{buttonContent}</TooltipWrap>
          </RadixToolbar.Button>
        </Dialog.Trigger>
        <Dialog.Portal container={editorRootElementRef?.current}>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <Dialog.Content className={styles.dialogContent}>
            <DialogForm
              uploadFileTitle={uploadFileTitle}
              submitButtonTitle={submitButtonTitle}
              onSubmitCallback={onSubmitCallback}
              acceptFileTypes={acceptFileTypes}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

const DialogForm: React.FC<{
  submitButtonTitle: string;
  uploadFileTitle: string;
  onSubmitCallback: (data: IDialogSubmit) => void;
  acceptFileTypes: string;
}> = ({
  onSubmitCallback,
  submitButtonTitle,
  uploadFileTitle,
  acceptFileTypes,
}) => {
  const fileRef = useRef<HTMLInputElement>();
  const iconComponentFor = useCellValue(iconComponentFor$);

  const onSubmitEH = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmitCallback({
      file: fileRef.current!.files!,
    });
  };

  return (
    <form onSubmit={onSubmitEH} className={styles.multiFieldForm}>
      <div className={styles.formField}>
        <label htmlFor="file">{uploadFileTitle}</label>
        <input type="file" accept={acceptFileTypes} ref={fileRef} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "var(--spacing-2)",
        }}
      >
        <button
          type="submit"
          title={submitButtonTitle}
          aria-label={submitButtonTitle}
          className={classNames(
            styles.actionButton,
            styles.primaryActionButton,
          )}
        >
          {iconComponentFor("check")}
        </button>

        <Dialog.Close className={styles.actionButton}>
          {iconComponentFor("close")}
        </Dialog.Close>
      </div>
    </form>
  );
};
