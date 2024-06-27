import { createFileRoute } from "@tanstack/react-router";
import Adder from "@/components/adder";
import TodoList from "@/components/todo-list";

const Component: React.FC = () => {
  return (
    <main className="container2 flex flex-col items-center gap-4 pt-6">
      <article className="flex w-full flex-col gap-4">
        <Adder />
        <TodoList />
      </article>
    </main>
  );
};

export const Route = createFileRoute("/lists/$listId")({
  component: Component,
});