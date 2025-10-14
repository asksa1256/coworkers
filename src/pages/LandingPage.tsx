import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LandingPage() {
  return (
    <main className="font-pretendard">
      <h2 className="text-4xl font-bold">Coworkers</h2>
      <h2 className="text-3xl font-semibold">Coworkers</h2>
      <h2 className="text-2xl font-medium">Coworkers</h2>
      <h2 className="text-xl">Coworkers</h2>
      <br />
      <h2 className="text-4xl font-bold text-primary">Coworkers</h2>
      <h2 className="text-3xl font-semibold text-secondary">Coworkers</h2>
      <h2 className="text-2xl font-medium text-tertiary">Coworkers</h2>
      <h2 className="text-xl text-disabled">Coworkers</h2>
      <br />
      <h2 className="text-4xl text-text-primary">Coworkers</h2>
      <h2 className="text-3xl text-text-secondary">Coworkers</h2>
      <h2 className="text-2xl text-text-tertiary">Coworkers</h2>
      <h2 className="text-xl text-text-default">Coworkers</h2>

      <Button
        className="mt-4"
        onClick={() => toast.success("shadcn/ui 세팅 완료")}
      >
        토스트 오픈
      </Button>
    </main>
  );
}
