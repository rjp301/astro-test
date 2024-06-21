import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/client";
import { todosQueryOptions } from "@/lib/queries";
import type { Todo } from "astro:db";
import useListId from "@/app/hooks/use-list-id";
import { toast } from "sonner";

export default function Adder(): ReturnType<React.FC> {
  const client = useQueryClient();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const listId = useListId();

  const [value, setValue] = React.useState<string>("");
  const { queryKey } = todosQueryOptions;

  const createMutation = useMutation({
    mutationFn: (data: Omit<typeof Todo.$inferInsert, "userId">) =>
      api.todos.$post({ json: data }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create todo");
    },
  });

  const create = () => {
    if (value) {
      createMutation.mutate({ text: value, listId });
      setValue("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        autoFocus
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-md px-4"
        placeholder="Add a todo..."
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            create();
          }
        }}
      />
      <Button onClick={create} disabled={!value}>
        {createMutation.isPending ? (
          <Loader2 size="1.2rem" className="mr-2 animate-spin" />
        ) : (
          <Plus size="1.2rem" className="mr-2" />
        )}
        Add
      </Button>
    </div>
  );
}
