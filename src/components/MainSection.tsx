import { Card, CardHeader, CardTitle,CardContent } from "@/components/ui/card";

export default function MainSection(){
    return (
        <div className="px-4 py-2">
         <Card className="w-25">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>
                Moddhanno
              </CardTitle>
            </CardHeader>
            <CardContent>
              this a i
            </CardContent>
         </Card>
      </div>
    )
}