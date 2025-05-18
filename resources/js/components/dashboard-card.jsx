import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropTypes from 'prop-types';

export function DashboardCard({ cardData = [] }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{cardData.title}</CardTitle>
                {cardData.icon && <cardData.icon className="text-muted-foreground h-4 w-4" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{cardData.value}</div>
                <p className="text-muted-foreground text-xs">{cardData.description}</p>
            </CardContent>
        </Card>
    );
}

DashboardCard.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.number,
            description: PropTypes.string,
            icon: PropTypes.elementType,
        }),
    ),
};
