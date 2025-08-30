import { Button } from "~/components/ui/button";

export function Welcome() {
  return (
    <main className="flex size-full items-center justify-center">
      <Button onClick={() => alert("World!!")}>Hello</Button>
    </main>
  );
}
