import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DataCard = ({ title, subtitle, data = [], actions = null }) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <CardTitle className="text-base">{title}</CardTitle>
                    {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
                </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
                {data.map((item, index) => (
                    <div key={index}>
                        <span className="font-medium">{item.label}:</span> {item.value}
                    </div>
                ))}

                {actions && actions}
            </CardContent>
        </Card>
    );
};
