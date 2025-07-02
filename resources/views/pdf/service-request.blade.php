<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Repair and Maintenance Request</title>
</head>
<body>
    <div
        style="
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            font-family: Arial, sans-serif;
            font-size: 12px;
        "
    >
        <!-- Header -->
        <div style="margin-bottom: 6px;">
            <!-- Left Column -->
            <div style="float: left; width: 45%;">
                <div style="display: inline-block; width: 220px; height: 68px; padding-left: 50px; border-radius: 4px; text-align: center; line-height: 64px; vertical-align: top; margin-right: 16px;">
                <!-- Replace with static image or icon font -->
                    <img src="./vsu-logo-new.png" alt="ppo-logo" style="height: 78px; width: auto;" />
                </div>
            </div>

            <!-- Right Column -->
            <div style="float: left; width: 45%; text-align: right;">
                <div style="display: inline-block; width: 64px; height: 64px; vertical-align: top; padding-left: 6px; border-left: 3px solid #146939;">
                    <!-- Replace with static image or icon font -->
                    <img src="./ppo-logomark.png" alt="ppo-logo" style="height: 62px; width: 62px; margin-left: 0px;" />
                </div>
                <div style="display: inline-block; vertical-align: top; padding-top: 8px; text-align: left;">
                    <h2 style="font-size: 20px; font-weight: bold; color: #166534; margin: 0; line-height: 1.2;">PHYSICAL PLANT</h2>
                    <h2 style="font-size: 20px; font-weight: bold; color: #166534; margin: 0; line-height: 1.2;">OFFICE</h2>
                </div>
            </div>

            <!-- Clear Floats -->
            <div style="clear: both;"></div>
        </div>

        <!-- Title -->
        <h1 style="
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        ">
            REPAIR AND MAINTENANCE REQUEST
        </h1>

        <!-- Request Information Section -->
        <div style="margin-bottom: 6px;">
            <div style="
                background-color: #FFD966;
                border: 2px solid #000000;
                padding-left: 24px;
                font-weight: bold;
                font-size: 12px;
            ">
                REQUEST INFORMATION
            </div>

            <div style="overflow: hidden;">
                <!-- Left Column -->
                <div style="
                    float: left;
                    border: 1px solid #000000;
                    width: 47%;
                    padding-left: 6px;
                ">
                    <div style="
                        font-size: 11px;
                        font-style: italic;
                        margin-bottom: 2px;
                        text-decoration: underline;
                    ">
                        Filled in by requesting party
                    </div>

                    <!-- Fields -->
                    <div style="margin-bottom: 10px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Date filed</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;">{{ $data->formatted_date_filed }}</div>
                    </div>

                    <div style="margin-bottom: 10px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Building/Department</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;"></div>
                    </div>

                    <div style="margin-bottom: 10px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Location</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;"></div>
                    </div>

                    <div style="margin-bottom: 10px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Requesting party</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;">{{$data->requested_by_name}}</div>
                        <div style="
                            font-size: 12px;
                            margin-left: 190px;
                            margin-bottom: 2px;
                        ">
                            Name & Signature
                        </div>
                    </div>


                    <div style="margin-bottom: 10px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Designation/Position</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;">{{$data->requestedBy->role->name}}</div>
                    </div>

                    <div style="margin-bottom: 10px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Contact no./Email</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;">{{$data->receivedBy->contact_number}}</div>
                    </div>
                </div>

                <!-- Right Column -->
                <div style="
                    float: right;
                    border: 1px solid #000000;
                    width: 47%;
                    padding-left: 6px;
                    border-left: 1px solid #000000;
                ">
                    <div style="
                        font-size: 11px;
                        font-style: italic;
                        margin-bottom: 2px;
                        text-decoration: underline;
                    ">
                        Filled in by PPO
                    </div>

                    <div style="margin-bottom: 12px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Date received</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;">{{ $data->formatted_date_received }}</div>
                    </div>

                    <div style="margin-bottom: 10px;">
                    <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Received by</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;">{{$data->received_by_name}}</div>
                        <div style="
                            font-size: 12px;
                            margin-left: 190px;
                            margin-bottom: 2px;
                        ">
                            Name & Signature
                        </div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Designation/Position</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 12px; text-align: center;">{{$data->receivedBy->role->name}}</div>
                    </div>

                    <div style="margin-bottom: 2px;">
                        <span style="display: inline-block; width: 128px; font-size: 12px; vertical-align: top;">Request Reference Number</span>
                        <span style="margin: 0 8px;">:</span>
                        <div style="display: inline-block; width: calc(100% - 158px); border-bottom: 1px solid #000000; height: 24px;"></div>
                    </div>
                </div>

                <div style="clear: both;"></div>
            </div>
        </div>

        <!-- Work Type Checkboxes -->
        <div>
            <div
                style="
                background-color: #FFD966;
                padding-left: 8px;
                font-size: 12px;
                font-style: italic;
                border: 2px solid #000000;
                "
            >
                Please check and specify the nature of work requested:
            </div>
            <div
                style="
                border: 1px solid #000000;
                padding-left: 16px;
                "
            >
                <div style="overflow: hidden;">
                    <!-- Column 1 -->
                    <div
                        style="
                        float: left;
                        width: 32%;
                        margin-right: 2%;
                        "
                    >
                        <div>
                            <input type="checkbox" checked id="vehicle" style="margin-right: 4px; vertical-align: middle; transform: scale(0.75)" />
                            <label for="vehicle" style="font-size: 12px; vertical-align: middle;">
                                Vehicle Repair
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" id="welding" style="margin-right: 4px; vertical-align: middle; transform: scale(0.75)" />
                            <label for="welding" style="font-size: 12px; vertical-align: middle;">
                                Welding Works
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" id="machining" style="margin-right: 4px; vertical-align: middle; transform: scale(0.75)" />
                            <label for="machining" style="font-size: 12px; vertical-align: middle;">
                                Machining works
                            </label>
                            <div
                                style="
                                    font-size: 12px;
                                    color: #6b7280;
                                    font-style: italic;
                                    margin-left: 24px;
                                "
                            >
                                (Lathe, shaper, drill press, etc.)
                            </div>
                        </div>
                    </div>

                    <!-- Column 2 -->
                    <div
                        style="
                        float: left;
                        width: 32%;
                        margin-right: 2%;
                        "
                    >
                        <div>
                            <input type="checkbox" id="carpentry" style="margin-right: 4px; vertical-align: middle; transform: scale(0.75)" />
                            <label for="carpentry" style="font-size: 12px; vertical-align: middle;">
                                Carpentry & Furniture Works
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" id="plumbing" style="margin-right: 4px; vertical-align: middle; transform: scale(0.75)" />
                            <label for="plumbing" style="font-size: 12px; vertical-align: middle;">
                                Plumbing Works
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" id="instrumentation" style="margin-right: 4px; vertical-align: middle; transform: scale(0.75)" />
                            <label for="instrumentation" style="font-size: 12px; vertical-align: middle; line-height: 1px;">
                                Instrumentation equipment & Laboratory instrument
                            </label>
                        </div>
                    </div>

                    <!-- Column 3 -->
                    <div
                        style="
                        float: left;
                        width: 32%;
                        "
                    >
                        <div>
                            <input type="checkbox" id="electrical" style="margin-right: 4px; vertical-align: middle; transform: scale(0.75)" />
                            <label for="electrical" style="font-size: 12px; vertical-align: middle;">
                                Electrical Works
                            </label>
                        </div>
                    <div>
                        <input type="checkbox" id="hvac" style="margin-right: 4px; transform: scale(0.75); vertical-align: middle;" />
                        <label for="hvac" style="font-size: 12px; vertical-align: middle;">Heating, Ventilating, Air conditioning & Refrigeration</label>
                    </div>
                        
                    <div>
                        <input type="checkbox" id="others" style="margin-right: 0px; transform: scale(0.75); vertical-align: middle;" />
                        <label for="others" style="font-size: 12px; vertical-align: middle;">Others <span style="font-style: italic; font-size: 12px; vertical-align: middle;">(specify in the brief description below)</span></label>
                    </div>
                    </div>

                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>

        <!-- Brief Description -->
        <div style="margin-bottom: 6px;">
            <div
                style="
                    background-color: #FFD966;
                    text-align: center;
                    font-weight: bold;
                    font-size: 12px;
                    border: 2px solid #000000;
                "
            >
                Brief Description of the Nature of Work Requested
            </div>
            <div
                style="
                    border: 1px solid #000000;
                    height: 36px;
                    text-align: center;
                    font-weight: bold;
                    font-size: 16px;
                    horizontal-align: middle;
                "
            >{{$data->work_description}}</div>
        </div>

        <div
            style="
                border-bottom: 1px dashed #000000;
                margin-bottom: 2px;
                height: 0px;
            "
        ></div>

        <!-- Inspection Section -->
        <div style="margin-bottom: 6px;">
            <div style="background-color: #e5e7eb; padding-left: 8px; border: 2px solid #000000; font-weight: bold; font-size: 12px;">
                <span>INSPECTION </span>
                <span style="font-weight: normal; font-style: italic;">
                    (Filled in by PPO Personnel)
                </span>
            </div>
            <div style="border: 1px solid #000000; padding: 0px;">
                <div style="padding-left: 8px; border-bottom: 1px solid #000000;">
                    <span style="font-size: 12px; margin-right: 4px;">Date of Inspection:</span>
                    <div style="display: inline-block; border-bottom: 1px solid #000000; width: 128px; height: 12px; margin-right: 4px; text-align: center;">{{$data->date_of_inspection}}</div>

                    @php
                        $startMeridiem = \Carbon\Carbon::parse($data->time_started)->format('A');
                        $endMeridiem = \Carbon\Carbon::parse($data->serviceInspection->completed_at)->format('A');
                    @endphp

                    <span style="font-size: 12px; margin-right: 4px;">Time started:</span>
                    <div style="display: inline-block; border-bottom: 1px solid #000000; width: 60px; height: 12px; margin-right: 4px; text-align: center;">{{$data->time_started}}</div>
                    <span style="font-size: 12px; margin-right: 4px;">
                        <span style="{{ $startMeridiem === 'AM' ? 'text-decoration: underline; font-weight: bold;' : '' }}">[AM]</span>
                        <span style="{{ $startMeridiem === 'PM' ? 'text-decoration: underline; font-weight: bold;' : '' }}">[PM]</span>
                    </span>
                    <span style="font-size: 12px; margin-right: 4px;">Time ended:</span>
                    <div style="display: inline-block; border-bottom: 1px solid #000000; width: 60px; height: 12px; margin-right: 4px; text-align: center;">{{$data->time_ended}}</div>
                    <span style="font-size: 12px;">
                        <span style="{{ $endMeridiem === 'AM' ? 'text-decoration: underline; font-weight: bold;' : '' }}">[AM]</span>
                        <span style="{{ $endMeridiem === 'PM' ? 'text-decoration: underline; font-weight: bold;' : '' }}">[PM]</span>
                    </span>
                </div>

                <div style="padding: 4px 16px 0 16px; border-bottom: 1px solid #000000; height: 14px;"> <!-- font-size: 0 removes whitespace -->
                    <!-- Wrapper for inline-blocks -->
                    <div style="display: inline-block; margin-right: 32px; font-size: 12px;">
                        <label style="display: inline-block; vertical-align: middle;">
                            <input type="checkbox" id="inhouse" checked style="vertical-align: middle; transform: scale(0.75); margin: 0 4px 0 0;" />
                            In-House Repair and Maintenance
                        </label>
                    </div>
                    <div style="display: inline-block; font-size: 12px;">
                        <label style="display: inline-block; vertical-align: middle;">
                            <input type="checkbox" id="outsourcing" style="vertical-align: middle; transform: scale(0.75); margin: 0 4px 0 0;" />
                            For Outsourcing Repair and Maintenance
                        </label>
                    </div>
                </div>

                <div style="overflow: hidden; margin-bottom: 16px; border-bottom: 1px solid #000000;">
                    <!-- First Column -->
                    <div style="float: left; width: 30%; border-right: 1px solid #000000;">
                        <div style="padding: 4px; border-bottom: 1px solid #000000; font-size: 12px;">Materials/Parts</div>
                        <div>
                            <div style="height: 14px; border-bottom: 1px solid #000000;  padding: 0 0 4px 8px;">
                                <input type="checkbox" id="available" style="margin-right: 8px; vertical-align: middle; transform: scale(0.75);" {{ $data->serviceInspection->parts_available ? 'checked' : '' }}>
                                <label for="available" style="font-size: 12px; vertical-align: middle;">Available</label>
                            </div>
                            <div style="height: 14px;  padding: 0 0 4px 8px;">
                                <input type="checkbox" id="not-available" style="margin-right: 8px; vertical-align: middle; transform: scale(0.75);" {{ $data->serviceInspection->parts_available ? '' : 'checked' }}>
                                <label for="not-available" style="font-size: 12px; vertical-align: middle;">Not Available</label>
                            </div>
                        </div>
                    </div>

                    <!-- Second Column -->
                    <div style="float: left; width: 35%; margin-right: 2px; border-right: 1px solid #000000;">
                        <div style="padding: 4px; border-bottom: 1px solid #000000; font-size: 12px;">
                            <span style="margin-right: 8px;">Manpower Required:</span>
                            <div style="display: inline-block; border-bottom: 1px solid #000000; width: 96px; height: 1px;"></div>
                        </div>
                        <div>
                            <div style="height: 14px; border-bottom: 1px solid #000000; padding: 0 0 4px 8px;">
                                <input type="checkbox" id="available2" style="margin-right: 8px; vertical-align: middle; transform: scale(0.75);" {{ $data->serviceInspection->personnel_available ? 'checked' : '' }}>
                                <label for="available2" style="font-size: 12px; vertical-align: middle;">Available</label>
                            </div>
                            <div style="height: 14px;  padding: 0 0 4px 8px;">
                                <input type="checkbox" id="not-available2" style="margin-right: 8px; vertical-align: middle; transform: scale(0.75);" {{ $data->serviceInspection->personnel_available ? '' : 'checked' }}>
                                <label for="not-available2" style="font-size: 12px; vertical-align: middle;">Not Available</label>
                            </div>
                        </div>
                    </div>

                    <!-- Third Column -->
                    <div style="float: left; width: 48%;">
                        <div style="display: inline-block; width: 60%;">
                            <div style="float: left; width: 65%;">
                                <div style="padding-left: 4px; font-size: 12px;">Estimated hours/days of repair:</div>
                                <div style="padding-left: 4px; font-size: 12px; font-weight: bold;">Schedule of repair:</div>
                            </div>
                            <div style="float: right; width: 35%;">
                                <div style="padding: 8px; font-size: 12px;">
                                    <div style="border-bottom: 1px solid #000000; width: 100%; height: 12px; margin-top: 8px; text-align: center;">{{$data->serviceInspection->estimated_duration}}</div>
                                </div>
                                <div style="padding: 8px; font-size: 12px;">
                                    <div style="border-bottom: 1px solid #000000; width: 100%; height: 1px; margin-top: 0px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="clear: both;"></div>
                </div>

                <div style="overflow: hidden; padding-left: 8px; margin-top: 8px;">
                    <div style="float: left; width: 10%; margin-right: 0%;">
                        <div style="font-size: 12px; margin-bottom: 8px;">Conducted:</div>
                    </div>
                    <div style="float: left; width: 35%; margin-right: 2%;">
                        <div style="border-bottom: 1px solid #000000; width: 100%; height: 12px; margin-bottom: 4px; text-align: center;">{{$data->conducted_by_name}}</div>
                        <div style="font-size: 12px; text-align: center;">PPO Maintenance Personnel/Name &amp; Sign</div>
                        <div style="border-bottom: 1px solid #000000; width: 100%; height: 12px; margin-top: 4px; margin-bottom: 4px; text-align: center;">{{$data->serviceInspection->conductedBy->role->name}}</div>
                        <div style="font-size: 12px; text-align: center;">Designation/Position</div>
                    </div>
                    <div style="float: left; width: 10%; margin-right: 0%;">
                        <div style="font-size: 12px; margin-bottom: 8px;">Confirmed:</div>
                    </div>
                    <div style="float: left; width: 35%; margin-right: 2%;">
                        <div style="border-bottom: 1px solid #000000; width: 100%; height: 12px; margin-bottom: 4px; text-align: center;">{{$data->confirmed_by_name}}</div>
                        <div style="font-size: 12px; text-align: center;">Name &amp; Signature</div>
                        <div style="border-bottom: 1px solid #000000; width: 100%; height: 12px; margin-top: 4px; margin-bottom: 4px; text-align: center;">{{$data->serviceInspection->confirmedBy->role->name}}</div>
                        <div style="font-size: 12px; text-align: center;">Designation/Position</div>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>

        <!-- ACCOMPLISHMENT SECTION -->
        <div style="margin-bottom: 24px;">
            <div style="background-color: #e5e7eb; padding-left: 8px; border: 1px solid #000000; font-weight: bold; font-size: 12px;">
                ACCOMPLISHMENT
            </div>
            <div style="border: 1px solid #9ca3af; ">
                <!-- Left Column -->
                <div style="float: left; width: 45%; border: 1px solid #000000;">
                    <div style="font-size: 11px; font-style: italic; padding-left: 16px; border-bottom: 1px solid #000000; margin-bottom: 4px;">
                        Filled in by PPO Personnel
                    </div>

                    <!-- Conducted by -->
                    <div style="padding-left: 16px; margin-bottom: 4px;">
                        <div style="display: table; width: 100%;">
                            <div style="display: table-row;">
                                <div style="display: table-cell; width: 100px; font-size: 12px; vertical-align: middle;">Conducted by</div>
                                <div style="display: table-cell; width: 10px; font-size: 12px; vertical-align: middle;">:</div>
                                <div style="display: table-cell;">
                                    <div style="border-bottom: 1px solid #000000; padding-top: 12px; height: 12px; width: 100%; text-align: center">{{$data->conducted_by_name}}</div>
                                    <div style="
                                        font-size: 12px;
                                        text-align: center;
                                        margin-bottom: 2px;
                                    ">
                                        Name & Signature
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Date & Time Started -->
                    <div style="padding-left: 16px; margin-bottom: 4px;">
                        <div style="display: table; width: 100%;">
                            <div style="display: table-row;">
                                <div style="display: table-cell; width: 100px; font-size: 12px; vertical-align: middle;">Date & Time Started</div>
                                <div style="display: table-cell; width: 10px; font-size: 12px; vertical-align: middle;">:</div>
                                <div style="display: table-cell;">
                                    <div style="border-bottom: 1px solid #000; padding-top: 12px; height: 12px; width: 100%; text-align: center;">{{$data->date_of_inspection}} @ {{$data->time_started}} {{$startMeridiem}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Date & Time Finished -->
                    <div style="padding-left: 16px; margin-bottom: 4px;">
                        <div style="display: table; width: 100%;">
                            <div style="display: table-row;">
                                <div style="display: table-cell; width: 100px; font-size: 12px; vertical-align: middle;">Date & Time Finished</div>
                                <div style="display: table-cell; width: 10px; font-size: 12px; vertical-align: middle;">:</div>
                                <div style="display: table-cell;">
                                    <div style="border-bottom: 1px solid #000; padding-top: 12px; height: 12px; width: 100%; text-align: center;">{{$data->date_of_inspection}} @ {{$data->time_ended}} {{$endMeridiem}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Checked & Verified -->
                    <div style="padding-left: 16px;">
                        <div style="display: table; width: 100%;">
                            <div style="display: table-row;">
                                <div style="display: table-cell; width: 100px; font-size: 12px; vertical-align: middle;">Checked & verified</div>
                                <div style="display: table-cell; width: 10px; font-size: 12px; vertical-align: middle;">:</div>
                                <div style="display: table-cell;">
                                    <div style="border-bottom: 1px solid #000; padding-top: 12px; height: 12px; width: 100%; text-align: center;;">Marlon G. Burlas</div>
                                    <div style="
                                        font-size: 12px;
                                        text-align: center;
                                    ">
                                        PPO Head/Director
                                    </div>
                                    <div style="
                                        font-size: 12px;
                                        font-style: italic;
                                        text-align: center;
                                        margin-bottom: 2px;
                                    ">
                                        (Name and Signature)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Notes -->
                    <div style="border-top: 1px solid #000000; font-size: 12px; padding-left: 16px; font-style: italic; margin-bottom: 8px;">Notes:</div>
                    <div style="height: 22px;"></div>
                </div>

                    <!-- Right Column -->
                <div style="float: right; width: 50%; border: 1px solid #000000;">
                    <div style="font-size: 11px; font-style: italic; padding-left: 8px;">
                        Filled in by Requesting Party
                    </div>
                    <div>
                        <div style="display: table; width: 100%;">
                            <div style="display: table-row; text-align: center;">
                                <div style="background-color: #FFF2CC; padding: 12px; border-right: 1px solid #000000; border-bottom: 1px solid #000000; display: table-cell; width: 100px; font-weight: bold; font-size: 12px;">Service Satisfaction</div>
                                <div style="background-color: #FFF2CC; padding: 12px; border-bottom: 1px solid #000000; display: table-cell; width: 100px; font-weight: bold; font-size: 12px;">OVER ALL RATING</div>
                            </div>
                            <div style="display: table-row;">
                                <div style="padding-left: 8px; padding-bottom: 8px; border-right: 1px solid #000000; border-bottom: 1px solid #000000; display: table-cell; width: 45%; font-size: 12px;">
                                    <div>
                                        <input type="checkbox" id="rating1" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                        <span style="font-size: 12px;">1. Not Satisfied</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="rating2" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                        <span style="font-size: 12px;">2. Slightly Satisfied</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="rating3" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                        <span style="font-size: 12px;">3. Moderately Satisfied</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="rating4" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                        <span style="font-size: 12px;">4. Very Satisfied</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="rating5" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                        <span style="font-size: 12px;">5. Extremely Satisfied</span>
                                    </div>
                                </div>
                                <div style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; display: table-cell; width: 60%; font-size: 12px;">
                                    <div style="display: table; width: 100%;">
                                        <div style="display: table-row; text-align: left;">
                                            <div style="padding-left: 8px; display: table-cell; padding-bottom: 8px;">
                                                <div style="display: table; width: 100%;">
                                                    <div style="display: table-row; text-align: left;">
                                                        <div style="display: table-cell;">
                                                            <div style="display: inline-block; margin-right: 8px;">
                                                                <input type="checkbox" id="poor" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                                                <label style="font-size: 12px;">1. Poor</label>
                                                            </div>
                                                        </div>
                                                        <div style="display: table-cell;">
                                                            <div style="display: inline-block; margin-right: 8px;">
                                                                <input type="checkbox" id="fair" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                                                <label style="font-size: 12px;">2. Fair</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="display: table-row; text-align: left; border: 1px solid #000000;">
                                                        <div style="display: table-cell;">
                                                            <div style="display: inline-block;">
                                                                <input type="checkbox" id="good" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                                                <label style="font-size: 12px;">3. Good</label>
                                                            </div>
                                                        </div>
                                                        <div style="display: table-cell;">
                                                            <div style="display: inline-block;">
                                                                <input type="checkbox" id="very-good" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                                                <label style="font-size: 12px;">4. Very Good</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="display: table-row; text-align: left;">
                                                        <div style="display: table-cell; width: 60%;">
                                                            <div style="display: inline-block; margin-right: 8px;">
                                                                <input type="checkbox" id="excellent" style="margin-right: 4px; height: 10px; vertical-align: top; transform: scale(0.75);" />
                                                                <label style="font-size: 12px;">5. Excellent</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="display: table-row; text-align: center; font-weight: bold;">
                                            <div style="display: table-cell; border-top: 1px solid #000000;">
                                                Comments & Suggestions
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: table-row; text-align: center;">
                                <div style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; display: table-cell;">
                                    <div style="width: 100%; display: table;">
                                        <div style="display: table-row;">
                                            <div style="display: table-cell; vertical-align: bottom; height: 24px; border-bottom: 1px solid #000000;">
                                                {{$data->requested_by_name}}
                                            </div>
                                        </div>
                                        <div style="display: table-row;">
                                            <div style="display: table-cell; height: 36px; border-bottom: 1px solid #000000;">
                                                Name & Signature
                                                <div style="padding-top: 8px; vertical-align: bottom;">{{$data->requestedBy->role->name}}</div>
                                            </div>
                                        </div>
                                        <div style="display: table-row;">
                                            <div style="display: table-cell;">
                                                Designation/Position
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="border-bottom: 1px solid #000000; display: table-cell;"></div>
                            </div>
                            <div style="display: table-row; text-align: center;">
                                <div style="border-right: 1px solid #000000; display: table-cell; height: 18px;"></div>
                                <div style="display: table-cell; height: 18px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fixed Footer using Table -->
        <div style="
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background-color: #f9f9f9;
        font-size: 12px;
        border-top: 2px solid #146939;
        padding: 8px 0px;
        box-sizing: border-box;
        ">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                <!-- Left Side: Logo + PPO Info -->
                <td style="width: 50%; text-align: left; vertical-align: top;">
                    <table style="border-collapse: collapse;">
                    <tr>
                        <td style="vertical-align: top;">
                        <img src="ppo-info.png" style="height: 70px;" alt="PPO Logo">
                        </td>
                        <td style="vertical-align: top; padding-left: 8px;">
                            <div style="vertical-align: middle;">
                                <div style="font-weight: bold;">PHYSICAL PLANT OFFICE</div>
                                <div>Visayas State University, PQVR+8JR Baybay City, Leyte</div>
                                <div>Email: ppo@vsu.edu.ph</div>
                                <div>Website: www.vsu.edu.ph</div>
                                <div>Phone: +63 53 565 0600 Local 1041</div>
                            </div>
                        </td>
                    </tr>
                    </table>
                </td>

                <!-- Right Side: Document Metadata -->
                <td style="width: 30%; text-align: right; font-size: 10px; vertical-align: top;">
                    <div style="font-style: italic;">Page 1 of 1</div>
                    <div style="font-weight: bold;">FM-PPO-09</div>
                    <div style="font-style: italic;">V2.xx-xx-xxxx</div>
                    <div style="
                    background-color: #9ca3af;
                    width: 84px;
                    height: 24px;
                    margin-top: 4px;
                    text-align: left;
                    vertical-align: middle;
                    padding-left: 4px;
                    font-style: italic;
                    line-height: 24px;
                    display: inline-block;
                    ">
                    No.
                    </div>
                </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>