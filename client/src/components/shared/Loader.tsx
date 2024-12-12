import { Card } from "@/components/ui/card.tsx";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="flex h-32 w-32 items-center justify-center rounded-xl shadow-lg">
        <div className="h-16 w-16 animate-spin rounded-full border-8 border-primary border-t-transparent"></div>
      </Card>
    </div>
  );
};

export default Loader;
