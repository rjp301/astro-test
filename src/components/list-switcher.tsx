import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";
import type { List } from "@/api/db/schema.ts";
import { useQuery } from "@tanstack/react-query";
import { listsQueryOptions } from "@/lib/queries.ts";
import { client } from "@/lib/client.ts";
import { Plus } from "lucide-react";

type Props = {
  lists?: List[];
};

const ListSwitcher: React.FC<Props> = (props) => {
  const { lists } = props;

  const listQuery = useQuery(
    { ...listsQueryOptions, initialData: lists },
    client,
  );

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        {listQuery.data?.map((list) => (
          <SelectItem key={list.id} value={list.id}>
            {list.name}
          </SelectItem>
        ))}
        <SelectSeparator />
        <SelectItem value="new" className="flex">
          <Plus className="mr-2 h-4 w-4" />
          <span>New List</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ListSwitcher;
