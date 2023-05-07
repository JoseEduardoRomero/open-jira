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
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({
      type: "[Entry] Add-Entry",
      payload: data,
    });
  };

  const updateEntry = async (entry: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });
      dispatch({
        type: "[Entry] Entry-Updated",
        payload: data,
      });
    } catch (err) {
      console.log({ err });
    }
  };

  const refreashEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({
      type: "[Entry] Refresh-Data",
      payload: data,
    });
  };

  useEffect(() => {
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
