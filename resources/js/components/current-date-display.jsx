import { Card, CardContent } from '@/components/ui/card';

export const CurrentDateDisplay = () => {
    const date = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    // Format the date to a more readable format (e.g., "Monday, January 1, 2023")
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <Card className="w-fit rounded-2xl bg-white p-2 shadow-md">
            <CardContent className="text-center text-xl font-medium text-gray-800">{formattedDate}</CardContent>
        </Card>
    );
};
