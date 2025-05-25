import { Checkbox } from '@/components/ui/checkbox';
import { Building2, User } from 'lucide-react';

export default function MotorPoolRequestForm() {
    return (
        <div className="mx-auto max-w-4xl bg-white p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded bg-green-800">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">VISAYAS</h1>
                        <p className="text-sm text-gray-600">STATE UNIVERSITY</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded bg-green-700">
                        <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-green-800">PHYSICAL PLANT</h2>
                        <h2 className="text-xl font-bold text-green-800">OFFICE</h2>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-center text-xl font-bold">REPAIR AND MAINTENANCE REQUEST</h1>

            {/* Request Information Section */}
            <div className="mb-6">
                <div className="mb-2 bg-yellow-200 p-2 text-sm font-bold">REQUEST INFORMATION</div>
                <div className="grid grid-cols-2 gap-6 border border-gray-400">
                    {/* Left Column */}
                    <div className="space-y-3 p-3">
                        <div className="text-sm italic">Filled in by requesting party</div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Date filed</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Building/Department</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Location</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Requesting party</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>
                        <div className="mr-4 text-right text-xs text-gray-600">Name & Signature</div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Designation/Position</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Contact no./Email</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 border-l border-gray-400 p-3">
                        <div className="text-sm italic">Filled in by PPO</div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Date received</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Received by</label>
                            <span></span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>
                        <div className="mr-4 text-right text-xs text-gray-600">Name & Signature</div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Designation/Position</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="w-32 text-sm">Request Reference Number</label>
                            <span>:</span>
                            <div className="h-6 flex-1 border-b border-gray-400"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Work Type Checkboxes */}
            <div className="mb-6">
                <div className="mb-2 bg-yellow-200 p-2 text-sm font-bold">Please check and specify the nature of work requested:</div>
                <div className="border border-gray-400 p-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id="vehicle" />
                                <label htmlFor="vehicle" className="text-sm">
                                    Vehicle Repair
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="welding" />
                                <label htmlFor="welding" className="text-sm">
                                    Welding Works
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="machining" />
                                <label htmlFor="machining" className="text-sm">
                                    Machining works
                                </label>
                            </div>
                            <div className="ml-6 text-xs text-gray-600 italic">(Lathe, shaper, drill press, etc.)</div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id="carpentry" />
                                <label htmlFor="carpentry" className="text-sm">
                                    Carpentry & Furniture Works
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="plumbing" />
                                <label htmlFor="plumbing" className="text-sm">
                                    Plumbing Works
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="instrumentation" />
                                <label htmlFor="instrumentation" className="text-sm">
                                    Instrumentation equipment & Laboratory instrument
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id="electrical" />
                                <label htmlFor="electrical" className="text-sm">
                                    Electrical Works
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="hvac" />
                                <label htmlFor="hvac" className="text-sm">
                                    Heating, Ventilating, Air conditioning & Refrigeration
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="others" />
                                <label htmlFor="others" className="text-sm">
                                    Others
                                </label>
                            </div>
                            <div className="ml-6 text-xs text-gray-600 italic">(specify in the brief description below)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brief Description */}
            <div className="mb-6">
                <div className="mb-2 bg-yellow-200 p-2 text-sm font-bold">Brief Description of the Nature of Work Requested</div>
                <div className="h-24 border border-gray-400"></div>
            </div>

            {/* Inspection Section */}
            <div className="mb-6">
                <div className="mb-2 bg-gray-200 p-2 text-sm font-bold">INSPECTION (Filled in by PPO Personnel)</div>
                <div className="space-y-4 border border-gray-400 p-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm">Date of Inspection:</span>
                        <div className="h-6 w-32 border-b border-gray-400"></div>
                        <span className="text-sm">Time started:</span>
                        <div className="h-6 w-20 border-b border-gray-400"></div>
                        <span className="text-sm">[AM] [PM]</span>
                        <span className="text-sm">Time ended:</span>
                        <div className="h-6 w-20 border-b border-gray-400"></div>
                        <span className="text-sm">[AM] [PM]</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Checkbox id="inhouse" />
                            <label htmlFor="inhouse" className="text-sm">
                                In-House Repair and Maintenance
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="outsourcing" />
                            <label htmlFor="outsourcing" className="text-sm">
                                For Outsourcing Repair and Maintenance
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="mb-2 flex items-center gap-4">
                                <span className="text-sm">Materials/Parts</span>
                                <span className="text-sm">Manpower Required:</span>
                                <div className="h-6 w-24 border-b border-gray-400"></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="available" />
                                    <label htmlFor="available" className="text-sm">
                                        Available
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="not-available" />
                                    <label htmlFor="not-available" className="text-sm">
                                        Not Available
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="available2" />
                                    <label htmlFor="available2" className="text-sm">
                                        Available
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="not-available2" />
                                    <label htmlFor="not-available2" className="text-sm">
                                        Not Available
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-sm">Estimated hours/days of repair:</div>
                            <div className="mb-2 h-6 w-32 border-b border-gray-400"></div>
                            <div className="text-sm">Schedule of repair:</div>
                            <div className="h-6 w-32 border-b border-gray-400"></div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-8">
                        <div>
                            <div className="mb-2 text-sm">Conducted:</div>
                            <div className="mb-1 h-6 w-full border-b border-gray-400"></div>
                            <div className="text-center text-xs text-gray-600">PPO Maintenance Personnel/Name & Sign</div>
                            <div className="mt-4 mb-1 h-6 w-full border-b border-gray-400"></div>
                            <div className="text-center text-xs text-gray-600">Designation/Position</div>
                        </div>
                        <div>
                            <div className="mb-2 text-sm">Confirmed:</div>
                            <div className="mb-1 h-6 w-full border-b border-gray-400"></div>
                            <div className="text-center text-xs text-gray-600">Name and Signature</div>
                            <div className="mt-4 mb-1 h-6 w-full border-b border-gray-400"></div>
                            <div className="text-center text-xs text-gray-600">Designation/Position</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accomplishment Section */}
            <div className="mb-6">
                <div className="mb-2 bg-gray-200 p-2 text-sm font-bold">ACCOMPLISHMENT</div>
                <div className="grid grid-cols-2 gap-0 border border-gray-400">
                    {/* Left Column */}
                    <div className="border-r border-gray-400 p-4">
                        <div className="mb-4 text-sm italic">Filled in by PPO Personnel</div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="w-20 text-sm">Conducted by</span>
                                <span>:</span>
                                <div className="h-6 flex-1 border-b border-gray-400"></div>
                            </div>
                            <div className="text-center text-xs text-gray-600">PPO Maintenance Personnel</div>
                            <div className="text-center text-xs text-gray-600">(Name and Signature)</div>

                            <div className="flex items-center gap-2">
                                <span className="w-20 text-sm">Date & Time Started</span>
                                <span>:</span>
                                <div className="h-6 flex-1 border-b border-gray-400"></div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-20 text-sm">Date & Time Finished</span>
                                <span>:</span>
                                <div className="h-6 flex-1 border-b border-gray-400"></div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-20 text-sm">Checked &verified</span>
                                <span>:</span>
                                <div className="h-6 flex-1 border-b border-gray-400"></div>
                            </div>
                            <div className="text-center text-xs text-gray-600">PPO Head/Director</div>
                            <div className="text-center text-xs text-gray-600">(Name and Signature)</div>

                            <div className="text-sm font-bold">Notes:</div>
                            <div className="h-16 border border-gray-400"></div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="p-4">
                        <div className="mb-4 text-sm italic">Filled in by Requesting Party</div>

                        <div className="mb-4 text-center">
                            <div className="text-sm font-bold">Service Satisfaction</div>
                            <div className="text-sm font-bold">OVER ALL RATING</div>
                        </div>

                        <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating1" />
                                    <span className="text-sm">1. Not Satisfied</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="poor" />
                                        <span className="text-sm">1. Poor</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="fair" />
                                        <span className="text-sm">2. Fair</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating2" />
                                    <span className="text-sm">2. Slightly Satisfied</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="good" />
                                    <span className="text-sm">3. Good</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating3" />
                                    <span className="text-sm">3. Moderately Satisfied</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="very-good" />
                                    <span className="text-sm">4. Very Good</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="rating4" />
                                    <span className="text-sm">4. Very Satisfied</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="excellent" />
                                    <span className="text-sm">5. Excellent</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox id="rating5" />
                                <span className="text-sm">5. Extremely Satisfied</span>
                            </div>
                        </div>

                        <div className="mb-2 text-sm font-bold">Comments & Suggestion</div>
                        <div className="mb-4 h-16 border border-gray-400"></div>

                        <div className="mb-1 h-6 border-b border-gray-400"></div>
                        <div className="text-center text-xs text-gray-600">Name &Signature</div>

                        <div className="mt-4 mb-1 h-6 border-b border-gray-400"></div>
                        <div className="text-center text-xs text-gray-600">Designation/Position</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-green-700">
                        <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-xs">
                        <div className="font-bold">PHYSICAL PLANT OFFICE</div>
                        <div>Visayas State University, PQVR+8JR Baybay City, Leyte</div>
                        <div>Email: ppo@vsu.edu.ph</div>
                        <div>Website: www.vsu.edu.ph</div>
                        <div>Phone: +63 53 565 0600 Local 1041</div>
                    </div>
                </div>
                <div className="text-right text-xs">
                    <div>Page 1 of 1</div>
                    <div>FM-PPO-09</div>
                    <div>V2.xx.xx.xx</div>
                    <div className="mt-2 h-6 w-16 border border-gray-400"></div>
                    <div>No.</div>
                </div>
            </div>
        </div>
    );
}
