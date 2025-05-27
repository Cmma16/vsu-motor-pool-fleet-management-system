import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MetricsCard({ title, value, description, icon: Icon }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon && <Icon className="text-muted-foreground h-4 w-4" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && <p className="text-muted-foreground text-xs">{description}</p>}
            </CardContent>
        </Card>
    );
}
