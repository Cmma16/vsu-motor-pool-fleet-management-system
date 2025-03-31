import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import React from 'react';


export function DashboardCard({ pageData }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-medium">{pageData.title}</CardTitle>
                {pageData.icon && React.createElement(pageData.icon, { className: 'h-4 w-4 text-muted-foreground' })}
            </CardHeader>
            <CardContent>
                {pageData.description && <p className="text-muted-foreground mb-2 text-xs">{pageData.description}</p>}
                <div className="mb-2 grid grid-cols-4 justify-evenly gap-1 rounded-lg border bg-[#006600] text-center text-white">
                    {pageData.stats.map((stat, index) => (
                        <div key={index} className={`flex flex-col py-2 ${index < pageData.stats.length - 1 ? 'border-r' : ''}`}>
                            <span className="text-md font-bold">{stat.value}</span>
                            <span className="text-xs">{stat.label}</span>
                        </div>
                    ))}
                </div>
                {pageData.linkHref && (
                    <Link key={pageData.title} href={pageData.linkHref} className="text-[#006600] hover:underline">
                        Manage
                    </Link>
                )}
            </CardContent>
        </Card>
    );
}
