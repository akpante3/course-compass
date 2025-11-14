import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  size?: "default" | "lg";
}

const SearchBar = ({ defaultValue = "", placeholder = "Search courses...", size = "default" }: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`pl-10 ${size === "lg" ? "h-14 text-lg" : "h-12"}`}
          />
        </div>
        <Button type="submit" size={size === "lg" ? "lg" : "default"} className="h-12">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
