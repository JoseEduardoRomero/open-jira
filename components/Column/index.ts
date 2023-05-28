import { Column as ColumnHOC } from "./Column";
import { ColumnNewEntry } from "./ColumnNewEntry";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnContent } from "./ColumnContent";

const Column = Object.assign(ColumnHOC, {
  Header: ColumnHeader,
  Content: ColumnContent,
  NewEntry: ColumnNewEntry,
});

export { Column, ColumnNewEntry, ColumnHeader, ColumnContent };
export default Column;
