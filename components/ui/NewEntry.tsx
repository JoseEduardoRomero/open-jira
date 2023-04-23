import { useContext } from "react";
import { Button, Stack, TextField, Grow } from "@mui/material";
import React, { ChangeEvent } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "../../context/ui/UIContext";

export const NewEntry = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const onHandleClick = React.useCallback((value: boolean) => {
    setIsAddingEntry(value);
  }, []);

  const onHandleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const onSave = () => {
    if (!inputValue.length) return;
    addNewEntry(inputValue);
    setInputValue("");
    setIsAddingEntry(false);
    setTouched(false);
  };

  return (
    <Stack spacing={2} padding="10px">
      {isAddingEntry ? (
        <Grow
          in={isAddingEntry}
          style={{ transformOrigin: "0 0 0" }}
          {...(isAddingEntry ? { timeout: 500 } : {})}
        >
          <Stack width="100%" justifyContent="center" alignItems="center">
            <TextField
              fullWidth
              placeholder="Nueva entrada"
              autoFocus
              multiline
              error={touched && !inputValue.length}
              label="Nueva entrada"
              helperText={touched && !inputValue.length && "Campo requerido"}
              value={inputValue}
              onChange={onHandleChange}
              onBlur={() => setTouched(true)}
            />
            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="text"
                onClick={() => onHandleClick(false)}
                color="error"
              >
                Cancelar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>
            </Stack>
          </Stack>
        </Grow>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => onHandleClick(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Stack>
  );
};

export default React.memo(NewEntry);
