import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
    return (
        <Tabs defaultValue="overview" className="width: 400px">
            <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="mo">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"></TabsContent>
            <TabsContent value="analytics"></TabsContent>
            <TabsContent value="reports"></TabsContent>
            <TabsContent value="settings"></TabsContent>
        </Tabs>
    );
}
