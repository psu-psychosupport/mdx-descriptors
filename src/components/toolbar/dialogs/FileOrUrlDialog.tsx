import * as Dialog from "@radix-ui/react-dialog";
import * as RadixToolbar from "@radix-ui/react-toolbar";

import React, { useRef } from "react";

import classNames from "classnames";
import { useCombobox } from "downshift";
import styles from "../../../styles/main.css";
import {
  TooltipWrap,
  editorRootElementRef$,
  iconComponentFor$,
  readOnly$,
} from "@mdxeditor/editor";
import { useCellValue, useCellValues } from "@mdxeditor/gurx";

const MAX_SUGGESTIONS = 20;

// Это ButtonDialog, но переделанный под файлы

export interface IDialogSubmit {
  url: string;
  file: FileList;
}

export const FileOrUrlDialog = React.forwardRef<
  HTMLButtonElement,
  {
    /**
     * The autocomplete suggestions to show in the dialog input.
     */
    autocompleteSuggestions?: string[];
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
     * The placeholder text to show in the dialog input.
     */
    dialogInputLabel: string;
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
      autocompleteSuggestions = [],
      submitButtonTitle,
      uploadFileTitle,
      dialogInputLabel,
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
              autocompleteSuggestions={autocompleteSuggestions}
              onSubmitCallback={onSubmitCallback}
              dialogInputLabel={dialogInputLabel}
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
  autocompleteSuggestions: string[];
  dialogInputLabel: string;
  onSubmitCallback: (data: IDialogSubmit) => void;
  acceptFileTypes: string;
}> = ({
  autocompleteSuggestions,
  onSubmitCallback,
  dialogInputLabel,
  submitButtonTitle,
  uploadFileTitle,
  acceptFileTypes,
}) => {
  const [items, setItems] = React.useState(
    autocompleteSuggestions.slice(0, MAX_SUGGESTIONS),
  );
  const fileRef = useRef<HTMLInputElement>();
  const iconComponentFor = useCellValue(iconComponentFor$);

  const enableAutoComplete = autocompleteSuggestions.length > 0;

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    initialInputValue: "",
    onInputValueChange({ inputValue }) {
      inputValue = inputValue?.toLowerCase() || "";
      const matchingItems = [];
      for (const suggestion of autocompleteSuggestions) {
        if (suggestion.toLowerCase().includes(inputValue)) {
          matchingItems.push(suggestion);
          if (matchingItems.length >= MAX_SUGGESTIONS) {
            break;
          }
        }
      }
      setItems(matchingItems);
    },
    items,
    itemToString(item) {
      return item ?? "";
    },
  });

  const onKeyDownEH = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        (e.target as HTMLInputElement).form?.reset();
      } else if (e.key === "Enter" && (!isOpen || items.length === 0)) {
        e.preventDefault();
        onSubmitCallback({
          url: (e.target as HTMLInputElement).value,
          file: fileRef.current!.files!,
        });
      }
    },
    [isOpen, items, onSubmitCallback],
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const downshiftInputProps = getInputProps();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const inputProps = {
    ...downshiftInputProps,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDownEH(e);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      downshiftInputProps.onKeyDown(e);
    },
  };

  const onSubmitEH = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmitCallback({
      url: (inputProps as { value: string }).value,
      file: fileRef.current!.files!,
    });
  };

  const dropdownIsVisible = isOpen && items.length > 0;
  return (
    <form onSubmit={onSubmitEH} className={styles.multiFieldForm}>
      <div className={styles.formField}>
        <label htmlFor="file">{uploadFileTitle}</label>
        <input type="file" accept={acceptFileTypes} ref={fileRef} />
      </div>

      <div className={styles.formField}>
        <label htmlFor="input_source">{dialogInputLabel}</label>
        <input
          placeholder={"http://example.com/file.pdf"}
          className={styles.linkDialogInput}
          id={"input_source"}
          {...inputProps}
          autoFocus
          size={30}
          data-editor-dialog={true}
        />
      </div>
      {enableAutoComplete && (
        <button
          aria-label="toggle menu"
          type="button"
          {...getToggleButtonProps()}
        >
          {iconComponentFor("arrow_drop_down")}
        </button>
      )}

      <div className={styles.downshiftAutocompleteContainer}>
        <ul {...getMenuProps()} data-visible={dropdownIsVisible}>
          {items.map((item, index: number) => (
            <li
              data-selected={selectedItem === item}
              data-highlighted={highlightedIndex === index}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
        </ul>
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
