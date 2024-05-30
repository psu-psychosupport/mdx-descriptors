import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { ITest } from "../../../types/test";
import { useFetcher } from "@remix-run/react";

export default function TestDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  tests: ITest[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testId: number) => void;
}) {
  const fetcher = useFetcher();
  const [tests, setTests] = useState<ITest[]>();

  useEffect(() => {
    fetcher.submit(
      { goal: "get-tests" },
      { method: "POST", encType: "application/json" }
    );
  }, []);

  useEffect(() => {
    if (fetcher.data && fetcher.data.goal === "get-tests") {
      setTests(fetcher.data.data);
    }
  }, [fetcher.data]);


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Выбор теста</DialogTitle>
      <DialogContent>
        {tests ? (
          <List sx={{ pt: 0 }}>
            {tests.map((test) => (
              <ListItem disableGutters key={test.id}>
                <ListItemButton onClick={() => onSubmit(test.id!)}>
                  <ListItemText primary={test.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <DialogContentText>Загрузка тестов...</DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
}
