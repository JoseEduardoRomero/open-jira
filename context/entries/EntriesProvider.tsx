import { useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";

import { Entry } from "../../interfaces";
import entriesApi from "../../apis/entriesApi";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    // Mandamos la nueva descripcion a la base de datos, por defecto se pone status = pending
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    // Actualizamos el estado local
    dispatch({
      type: "[Entry] Add-Entry",
      payload: data,
    });
  };

  const updateEntry = async (entry: Entry) => {
    try {
      // Mandamos a la base de datos a la base de datos
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });

      // Hacemos update del estado local
      dispatch({
        type: "[Entry] Entry-Updated",
        payload: data,
      });
    } catch (err) {
      // En caso de salir con error, lo cachamos para poder hacer debug
      console.log({ err });
    }
  };

  const refreashEntries = async () => {
    // Obentemos la data de la base de dats
    const { data } = await entriesApi.get<Entry[]>("/entries");
    // Refresacamos el estado local de la aplicacion
    dispatch({
      type: "[Entry] Refresh-Data",
      payload: data,
    });
  };

  useEffect(() => {
    // Se ejecuta solo al cominezo de la app
    refreashEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
