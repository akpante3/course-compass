import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PlatformTabsProps {
  platforms: {
    name: string;
    count: number;
    content: React.ReactNode;
  }[];
}

const PlatformTabs = ({ platforms }: PlatformTabsProps) => {
  return (
    <Tabs defaultValue={platforms[0]?.name.toLowerCase()} className="w-full">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${platforms.length}, 1fr)` }}>
        {platforms.map((platform) => (
          <TabsTrigger key={platform.name} value={platform.name.toLowerCase()}>
            {platform.name} ({platform.count})
          </TabsTrigger>
        ))}
      </TabsList>
      {platforms.map((platform) => (
        <TabsContent key={platform.name} value={platform.name.toLowerCase()} className="mt-6">
          {platform.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PlatformTabs;
