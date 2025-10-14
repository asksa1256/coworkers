import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LandingPage() {
  return (
    <main className="font-pretendard">
      <h2 className="text-4xl font-bold">Coworkers</h2>
      <h2 className="text-3xl font-semibold">Coworkers</h2>
      <h2 className="text-2xl font-medium">Coworkers</h2>
      <h2 className="text-xl">Coworkers</h2>
      <br />
      <h2 className="text-primary text-4xl font-bold">Coworkers</h2>
      <h2 className="text-secondary text-3xl font-semibold">Coworkers</h2>
      <h2 className="text-tertiary text-2xl font-medium">Coworkers</h2>
      <h2 className="text-disabled text-xl">Coworkers</h2>
      <br />
      <h2 className="text-text-primary text-4xl">Coworkers</h2>
      <h2 className="text-text-secondary text-3xl">Coworkers</h2>
      <h2 className="text-text-tertiary text-2xl">Coworkers</h2>
      <h2 className="text-text-default text-xl">Coworkers</h2>

      <Button
        className="mt-4"
        onClick={() => toast.success('shadcn/ui 세팅 완료')}
      >
        토스트 오픈
      </Button>

      <div className="flex rounded-lg bg-blue-500 p-4 text-xl font-bold shadow-lg"></div>
    </main>
  );
}
