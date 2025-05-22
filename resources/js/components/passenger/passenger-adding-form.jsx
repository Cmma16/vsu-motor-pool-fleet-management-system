import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function PassengerAddingForm({ formData, setData, onPreviousStep, onSubmit, isSubmitting }) {
    const [currentPassenger, setCurrentPassenger] = useState({
        name: '',
        affiliation: '',
        contact_number: '',
        is_party_head: false,
    });

    const handleAddPassenger = () => {
        if (!currentPassenger.name) return;

        // If the new passenger is marked as party head, unmark any existing party head
        let updatedPassengers = [...(formData.passengers || [])];
        if (currentPassenger.is_party_head) {
            updatedPassengers = updatedPassengers.map((p) => ({ ...p, is_party_head: false }));
        }

        // Add the new passenger
        updatedPassengers.push(currentPassenger);
        setData('passengers', updatedPassengers);

        // Reset current passenger form
        setCurrentPassenger({
            name: '',
            affiliation: '',
            contact_number: '',
            is_party_head: false,
        });
    };

    const handleRemovePassenger = (index) => {
        const updatedPassengers = formData.passengers.filter((_, i) => i !== index);
        setData('passengers', updatedPassengers);
    };

    const handlePartyHeadChange = (index) => {
        const updatedPassengers = formData.passengers.map((passenger, i) => ({
            ...passenger,
            // If this is the clicked passenger, toggle their party head status
            // If it's not the clicked passenger, set to false
            is_party_head: i === index ? !passenger.is_party_head : false,
        }));
        setData('passengers', updatedPassengers);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Passenger Information</CardTitle>
                <CardDescription>Add all passengers who will be traveling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="passenger-name">Passenger Name</Label>
                        <Input
                            id="passenger-name"
                            placeholder="Full name"
                            value={currentPassenger.name}
                            onChange={(e) => setCurrentPassenger({ ...currentPassenger, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passenger_affiliation">Department/Office/Center/Project</Label>
                        <Input
                            id="passenger_affiliation"
                            type="text"
                            placeholder="Department/Office/Center/Project"
                            value={currentPassenger.affiliation}
                            onChange={(e) => setCurrentPassenger({ ...currentPassenger, affiliation: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact_number">Contact Number</Label>
                        <div className="flex space-x-2">
                            <Input
                                id="contact_number"
                                placeholder="Contact number"
                                value={currentPassenger.contact_number}
                                onChange={(e) => setCurrentPassenger({ ...currentPassenger, contact_number: e.target.value })}
                            />
                            <Button type="button" onClick={handleAddPassenger} disabled={!currentPassenger.name} size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is_party_head"
                        checked={currentPassenger.is_party_head}
                        onCheckedChange={(checked) => {
                            // If there's already a party head and we're trying to add another one, don't allow it
                            if (checked && formData.passengers?.some((p) => p.is_party_head)) {
                                return;
                            }
                            setCurrentPassenger({ ...currentPassenger, is_party_head: checked });
                        }}
                    />
                    <Label htmlFor="is_party_head">Party Head</Label>
                </div>

                {formData.passengers?.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Department/Office</TableHead>
                                <TableHead>Contact Number</TableHead>
                                <TableHead className="w-[100px]">Party Head</TableHead>
                                <TableHead className="w-[70px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formData.passengers.map((passenger, index) => (
                                <TableRow key={index}>
                                    <TableCell>{passenger.name}</TableCell>
                                    <TableCell>{passenger.affiliation}</TableCell>
                                    <TableCell>{passenger.contact_number}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={passenger.is_party_head}
                                            onCheckedChange={() => handlePartyHeadChange(index)}
                                            // Only disable if there's already a party head and this passenger isn't it
                                            disabled={formData.passengers.some((p, i) => i !== index && p.is_party_head)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemovePassenger(index)}>
                                            <Trash2 className="text-destructive h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-muted-foreground py-4 text-center">No passengers added yet. Add at least one passenger to continue.</div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={onPreviousStep}>
                    Back to Trip Details
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!formData.passengers?.length || isSubmitting || !formData.passengers.some((p) => p.is_party_head)}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        'Submit Trip Request'
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
