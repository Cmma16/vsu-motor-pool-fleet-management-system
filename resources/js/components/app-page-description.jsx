export function AppPageDescription({ details }) {
    return (
        <div>
            <h1 className="text-base font-semibold">{details.title}</h1>
            <span className="text-muted-foreground text-sm">{details.description}</span>
        </div>
    );
}
