import { Search } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
}

const EmptyState = ({ 
  message = "No results found", 
  description = "Try adjusting your search or filters" 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{message}</h3>
      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;
