import { Button, Stack, TextField, Grow } from "@mui/material";
import React, { ChangeEvent } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const NewEntry = () => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const onHandleClick = React.useCallback(() => {
    setIsAdding((prevState) => !prevState);
  }, []);

  const onHandleChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const onSave = () => {
    if (!inputValue.length) return;
    console.log(inputValue);
  };

  return (
    <Stack spacing={2} padding="10px">
      {isAdding ? (
        <Grow
          in={isAdding}
          style={{ transformOrigin: "0 0 0" }}
          {...(isAdding ? { timeout: 500 } : {})}
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
            <Stack direction="row" spacing={2}>
              <Button variant="text" onClick={onHandleClick} color="error">
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
          onClick={onHandleClick}
        >
          Agregar tarea
        </Button>
      )}
    </Stack>
  );
};

export default React.memo(NewEntry);
