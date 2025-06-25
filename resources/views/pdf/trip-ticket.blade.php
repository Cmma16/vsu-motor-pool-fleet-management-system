<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @page {
        margin: 15px 25px 15px 25px; /* top, right, bottom, left */
      }

      body {
        margin: 0;
        padding: 0;
      }
    </style>
    <title>Trip Ticket</title>
  </head>
  <body>
  @foreach ($passengerChunks as $chunk)
    <div
      style="
          max-width: 1000px;
          margin: 0 auto;
          padding: 0;
          background-color: white;
          font-family: Arial, sans-serif;
          font-size: 12px;
      "
    >
      <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
        <!-- Header Section -->
      <tr>
          <td>
            <table style="width: 100%; padding: 0 32px;">
              <tr>
                <td style="width: 40%; border-right: 3.5px solid #1A311D; ">
                    <img src="./vsu-logo-new.png" alt="ppo-logo" style="height: 95px; width: auto;" />
                </td>
                <td style="width: 50%; padding: 0 4px;">
                    <table style="">
                      <tr>
                        <td>
                          <img src="./ppo-logomark.png" alt="ppo-logo" style="height: 78px; width: auto; margin-left: 0px;" />
                        </td>
                        <td>
                          <h2 style="font-size: 24px; font-weight: bold; margin: 0; line-height: 1.2;">MOTOR POOL SERVICES UNIT</h2>
                          <span style="font-size: 15px; margin: 0; line-height: 1.2;">PHYSICAL PLANT OFFICE</span>
                        </td>
                      </tr>
                    </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Title Section -->
        <tr style="text-align: center;">
          <div style="font-size: 14px; font-weight: bold; margin: 4px; padding: 4px;">TRIP TICKET</div>
        </tr>
        <!-- Request Details Section -->
        <tr>
          <table style="width: 100%; padding: 0px 64px; margin: 0px;">
            <tr>
              <td>
                <table style="width: 100%;">
                  <!-- First row -->
                  <tr>
                    <td style="width: 17%">
                      <span style="">Date filed</span>
                    </td>
                    <td style="width: 2%">
                      <span style="">:</span>
                    </td>
                    <td style="width: 20%">
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 85%; text-align: center">{{$trip->formatted_date_filed}}</div>
                    </td>
                    <td style="width: 12%">
                      <span style="">Trip Number</span>
                    </td>
                    <td style="width: 2%">
                      <span style="">:</span>
                    </td>
                    <td style="width: 30%">
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center"></div>
                    </td>
                  </tr>
                  <!-- Second row -->
                  <tr>
                    <td style="width: 17%">
                      <span style="">Scheduled Travel Date/s</span>
                    </td>
                    <td style="width: 2%">
                      <span style="">:</span>
                    </td>
                    <td style="width: 20%">
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 85%; text-align: center">{{$trip->scheduled_date}}</div>
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 85%; text-align: center"></div>
                    </td>
                    <td style="width: 12%">
                      <span style="">Destination</span>
                    </td>
                    <td style="width: 2%">
                      <span style="">:</span>
                    </td>
                    <td style="width: 30%">
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$trip->destination}}</div>
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center"></div>
                    </td>
                  </tr>
                  <!-- Third row -->
                  <tr>
                    <td style="width: 17%">
                      <span style="">Departure Time</span>
                    </td>
                    <td style="width: 2%">
                      <span style="">:</span>
                    </td>
                    <td style="width: 20%">
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 85%; text-align: center">{{$trip->formatted_departure_time}}</div>
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 85%; text-align: center"></div>
                    </td>
                    <td style="width: 12%">
                      <span style="">Driver will report to</span>
                    </td>
                    <td style="width: 2%">
                      <span style="">:</span>
                    </td>
                    <td style="width: 30%">
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">VSU Upper Campus Main Gate</div>
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center"></div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Purpose Row -->
            <tr>
              <td>
                <table style="width: 100%;">
                  <tr>
                    <td style="width: 17%;">
                      <span style="">Purpose</span>
                    </td>
                    <td style="width: 2%;">
                      <span style="">:</span>
                    </td>
                    <td style="width: 64%;">
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$trip->purpose}}</div>
                      <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center"></div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </tr>
        <!-- Head of party section -->
        <tr>
          <table style="width: 100%; padding: 0px 58px;">
            <tr>
              <td style="width: 17%;">
                <span style="">Head of party:</span>
              </td>
              <td style="width: 64%;">
                <div style="font-weight: bold; height: 12px; width: 100%;">{{$trip->party_head->name}}</div>
              </td>
            </tr>
          </table>
        </tr>
        <!-- Passenger Section -->
        <tr>
          <table style="width: calc(100% - 100px); margin: 0px 50px; border-collapse: collapse; font-size: 12px;">
            <thead style="background-color: #D9D9D9">
              <tr>
                <th style="border: 1px solid #000; font-weight: normal; width: 30%; padding: 4px;">Passengers</th>
                <th style="border: 1px solid #000; font-weight: normal; width: 33%; padding: 4px;">Department/Office/Center/Project</th>
                <th style="border: 1px solid #000; font-weight: normal; width: 25%; padding: 4px;">Contact Number(s)</th>
              </tr>
            </thead>
            <tbody style="line-height: 1;">
              @foreach ($chunk as $index => $passenger)
                <tr>
                  <td style="border: 1px solid #000; padding-left: 24px">{{ $index + 1 }}. {{ $passenger->name }}</td>
                  <td style="border: 1px solid #000; text-align: center;">{{ $passenger->affiliation }}</td>
                  <td style="border: 1px solid #000; text-align: center;">{{ $passenger->contact_number }}</td>
                </tr>
              @endforeach
              <!-- Fill in empty rows if less than 10 -->
              @for ($i = $chunk->count(); $i < 10; $i++)
                <tr>
                  <td style="border: 1px solid #000; padding-left: 24px">&nbsp;</td>
                  <td style="border: 1px solid #000; text-align: center;">&nbsp;</td>
                  <td style="border: 1px solid #000; text-align: center;">&nbsp;</td>
              </tr>
              @endfor
            </tbody>
          </table>
          <span style="margin: 0px 50px; font-size: 10px; font-style: italic;">*For more than (10) passengers, use separate sheet.</span>
        </tr>
        <!-- Vehicle & Requesting party section -->
        <tr>
          <table style="width: calc(100% - 100px); margin: 8px 50px 0px 50px; border-collapse: collapse; font-size: 12px;">
            <tr>
              <td style="width: 20%">Vehicle Type: </td>
              <td style="width: 40%; padding: 0 32px 0 16px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$trip->vehicle->vehicle_name}}</div>
              </td>
              <td style="width: 40%">Requesting party: </td>
            </tr>
            <tr>
              <td style="width: 20%">Vehicle Plate No.: </td>
              <td style="width: 40%; padding: 0 32px 0 16px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$trip->vehicle->plate_number}}</div>
              </td>
              <td style="width: 40%;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center; font-weight: bold;">{{strtoupper($trip->requesting_party)}}</div>
              </td>
            </tr>
            <tr>
              <td style="width: 20%"></td>
              <td style="width: 40%; padding: 0 32px 0 16px;">
              </td>
              <td style="width: 40%;">
                <div style="text-align: center; font-size: 10px;">(Designation/Position)</div>
              </td>
            </tr>
          </table>
        </tr>
        <!-- Names & Signatures Section -->
        <tr>
          <table style="width: calc(100% - 100px); margin: 0px 50px; border-collapse: collapse; font-size: 12px;">
            <tr>
              <td style="width: 33%; padding-right: 32px;">Dispatched:</td>
              <td style="width: 33%; padding-right: 32px;">Recommended:</td>
              <td style="width: 33%;">Approved:</td>
            </tr>
            <tr>
              <td style="width: 33%; padding-right: 32px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center; font-weight: bold;">{{$trip->dispatcher_name}}</div>
              </td>
              <td style="width: 33%; padding-right: 32px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center; font-weight: bold;">AMIEL R. ARMADA</div>
              </td>
              <td style="width: 33%;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center; font-weight: bold;">MARLON G. BURLAS</div>
              </td>
            </tr>
            <tr>
              <td style="width: 33%; padding-right: 32px;">
                <div style="text-align: center; font-size: 10px;">In-Charge, Dispatching</div>
              </td>
              <td style="width: 33%; padding-right: 32px;">
                <div style="text-align: center; font-size: 10px;">Motor Pool Services, OIC, Head</div>
              </td>
              <td style="width: 33%;">
                <div style="text-align: center; font-size: 10px;">(Director/Center Director/Agency Head)</div>
              </td>
            </tr>
          </table>
        </tr>
        <!-- Service log section -->
        <tr>
          <table style="width: calc(100% - 100px); margin: 16px 50px 0px 50px; border-collapse: collapse; font-size: 12px;">
            <tr style="background-color: #D9D9D9">
              <td style="border: 1px solid #000; padding: 0 6px;">
                <span style="font-size: 11px; font-weight: bold;">INSTRUCTIONS:</span>
                <span style="font-size: 11px; font-style: italic;">
                  Drivers shall fill in this part properly. Drivers are accountable for and are responsible for reporting any vehicle damage, defects and accidents immediately
                </span>
              </td>
            </tr>
            <tr>
              <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tr>
                  <th style="border: 1px solid #000; font-weight: normal; width: 30%; padding: 0 8px;">Trip Ticket Issued/Received</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%; padding: 0 8px;">Vehicle Condition (Before Travel)</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%; padding: 0 8px;">Fuel & Lubricant Issued/Used</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 10%; padding: 0 8px;">Departure/ Time Out</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 25%; padding: 0 8px;">Odometer/Mileage Out</th>
                </tr>
                <tr>
                  <th style="border: 1px solid #000; font-weight: normal; width: 30%;">{{$trip->ticket_received}}</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%;">{{ucfirst($trip->tripLog->pre_trip_condition)}}</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%;"></th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 10%;">{{$trip->actual_departure}}</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 25%;">{{$trip->tripLog->odometerOut->reading}}</th>  
                </tr>
                <tr>
                  <th style="border: 1px solid #000; font-weight: normal; width: 30%; padding: 0 8px;">Date Returned</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%; padding: 0 8px;">Vehicle Condition (After Travel)</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%; padding: 0 8px;">Fuel & Lubricant Balanced</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 10%; padding: 0 8px;">Arrival/ Time In</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 25%; padding: 0 8px;">Odometer/Mileage In</th>
                </tr>
                <tr>
                  <th style="border: 1px solid #000; font-weight: normal; width: 30%;">{{$trip->vehicle_returned}}</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%;">{{ucfirst($trip->tripLog->post_trip_condition)}}</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 20%;"></th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 10%;">{{$trip->arrival}}</th>
                  <th style="border: 1px solid #000; font-weight: normal; width: 25%;">{{$trip->tripLog->odometerIn->reading}}</th>
                </tr>
              </table>
            </tr>
          </table>
        </tr>
        <!-- Yes/No Section -->
        <tr>
          <table style="width: calc(100% - 100px); margin: 4px 50px 0px 50px; border-collapse: collapse; font-size: 11px;">
            <tr style="font-style: italic;">
              <td style="border: 1px solid #000; width: 20%; padding: 0 6px;">
                Was the passenger/s following the call time & location?
              </td>
              <td style="border: 1px solid #000; width: 22%; padding: 0 6px;">
                Was there any purchased of fuel/lubricant outside VSU Campus?
              </td>
              <td style="border: 1px solid #000; width: 30%; padding: 0 6px;">
                Was the vehicle involved in accident or damaged while in your custody?
              </td>
              <td style="border: 1px solid #000; width: 28%; padding: 0 6px;">
                Was the vehicle used other than official government business?
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; width: 20%; padding: 0 6px;">
                <table style="width: 100%; border-collapse: collapse; height: auto;">
                  <tr>
                    <td style="border-right: 1px solid #000; width: 60%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">Yes</label>
                    </td>
                    <td style="border-left: 1px solid #000; width: 40%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">No</label>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="border: 1px solid #000; width: 22%; padding: 0 6px;">
                <table style="width: 100%; border-collapse: collapse; height: auto;">
                  <tr>
                    <td style="border-right: 1px solid #000; width: 70%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">Yes (Specify)</label>
                    </td>
                    <td style="border-left: 1px solid #000; width: 30%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">No</label>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="border: 1px solid #000; width: 30%; padding: 0 6px;">
                <table style="width: 100%; border-collapse: collapse; height: auto;">
                  <tr>
                    <td style="border-right: 1px solid #000; width: 60%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">Yes (Specify)</label>
                    </td>
                    <td style="border-left: 1px solid #000; width: 40%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">No</label>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="border: 1px solid #000; width: 28%; padding: 0 6px;">
                <table style="width: 100%; border-collapse: collapse; height: auto;">
                  <tr>
                    <td style="border-right: 1px solid #000; width: 60%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">Yes (Specify)</label>
                    </td>
                    <td style="border-left: 1px solid #000; width: 40%;">        
                      <input type="checkbox" id="available2" style="vertical-align: middle; transform: scale(0.75);">
                      <label for="available2" style="vertical-align: middle;">No</label>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </tr>
        <!-- Driver & Requesting party survey section -->
        <tr>
          <table style="width: calc(100% - 100px); margin: 4px 50px 0px 50px; border-collapse: collapse; font-size: 11px;">
            <tr>
              <td style="border: 1px solid #000; padding: 6px; width: 30%; text-align: center; background-color: #D9D9D9; font-size: 12px;">Driver’s Name & Signature </td>
              <td style="border: 1px solid #000; padding: 6px; width: 70%; background-color: #FFFF00; font-size: 12px;">Filled in by the Head of Party or Requesting Party</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 6px; width: 30%; text-align: center;">
                <div style="text-align: justify; font-style: italic;">
                  This vehicle will be used for official government business only. I have reviewed and complied with rules & regulations regarding the use of Government-Owned Vehicle.
                </div>
              </td>
              <td style="border: 1px solid #000; width: 70%; vertical-align: top;">
                  <table style="width: 100%; height: auto; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                    <tr style="width: 100%;">
                      <th style="border-bottom: 1px solid #000; border-right: 1px solid #000; width: 50%;">Service Satisfaction</th>
                      <th style="border-bottom: 1px solid #000; border-left: 1px solid #000; width: 50%;">Driver’s OVER ALL RATING</th>
                    </tr>
                    <tr style="width: 100%;">
                      <td style="border-right: 1px solid #000; width: 50%;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <div>
                                <input type="checkbox" id="rating1" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                <span style="font-size: 12px;">1. Not Satisfied</span>
                              </div>
                              <div>
                                <input type="checkbox" id="rating2" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                <span style="font-size: 12px;">2. Slightly Satisfied</span>
                              </div>
                              <div>
                                <input type="checkbox" id="rating3" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                <span style="font-size: 12px;">3. Moderately Satisfied</span>
                              </div>
                              <div>
                                <input type="checkbox" id="rating4" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                <span style="font-size: 12px;">4. Very Satisfied</span>
                              </div>
                              <div>
                                <input type="checkbox" id="rating5" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                <span style="font-size: 12px;">5. Extremely Satisfied</span>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="border-left: 1px solid #000; width: 50%;">
                        <table style="height: auto; width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <table style="line-height: 1; padding-bottom: 4px;">
                                <tr>
                                  <td>
                                    <div style="display: inline-block; margin-right: 8px;">
                                      <input type="checkbox" id="poor" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                      <label style="font-size: 12px;">1. - Poor</label>
                                    </div>
                                  </td>
                                  <td>
                                    <div style="display: inline-block; margin-right: 8px;">
                                      <input type="checkbox" id="fair" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                      <label style="font-size: 12px;">2. - Fair</label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div style="display: inline-block; margin-right: 8px;">
                                      <input type="checkbox" id="poor" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                      <label style="font-size: 12px;">3. - Good</label>
                                    </div>
                                  </td>
                                  <td>
                                    <div style="display: inline-block; margin-right: 8px;">
                                      <input type="checkbox" id="fair" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                      <label style="font-size: 12px;">4. - Very Good</label>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div style="display: inline-block; margin-right: 8px;">
                                      <input type="checkbox" id="poor" style="height: 10px; vertical-align: top; transform: scale(0.75);" />
                                      <label style="font-size: 12px;">5. - Excellent</label>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="vertical-align: bottom; border-top: 1px solid #000000; padding-left: 6px; font-weight: bold; font-size: 12px; background-color: #FFFF00;">
                              Comments & Suggestions
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000;">
                <table style="width: 100%; height: auto; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                  <tr style="width: 100%; height: auto;">
                    <th style="border-bottom: 1px solid #000; width: 50%; height: 30px; vertical-align: bottom;">{{$trip->driver_name}}</th>
                  </tr>
                  <tr style="width: 100%; height: auto;">
                    <th style="width: 50%; height: 24px; vertical-align: top;">
                      SIGNATURE OVER PRINTED NAME
                    </th>
                  </tr>
                </table>
              </td>
              <td style="border: 1px solid #000;">
                <table style="width: 100%; height: auto; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                  <tr style="width: 100%; height: auto;">
                    <th style="border-bottom: 1px solid #000; border-right: 1px solid #000; width: 50%; height: 30px; vertical-align: bottom;">{{strtoupper($trip->requesting_party)}}</th>
                    <td style="border-left: 1px solid #000; width: 50%; vertical-align: top; padding: 6px" rowspan="2">Comments go here</td>
                  </tr>
                  <tr style="width: 100%; height: auto;">
                    <th style="border-right: 1px solid #000; width: 50%; height: 24px; vertical-align: top;">
                      Name and Signature
                    </th>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </tr>
        <!-- Footer section -->
        <tr>
          <table style="width: calc(100% - 100px); border-top: 2px solid #1A311D;  margin: 48px 50px 0px 50px; border-collapse: collapse; font-size: 10px;">
            <tr>
              <td style="width: 11%">
                <img src="./ppo-logomark.png" alt="ppo-logo" style="height: 64px; width: auto; margin-left: 0px;" />
              </td>
              <td style="vertical-align: top;">
                <div style="font-weight: bold;">MOTOR POOL SERVICES UNIT</div>
                <div>Visayas State University, PQVR+8JR Baybay City, Leyte</div>
                <div>Email: ppo@vsu.edu.ph</div>
                <div>Website: www.vsu.edu.ph</div>
                <div>Phone: +63 53 565 0600 Local 1068</div>
              </td>
              <td style="text-align: right;">
                <div style="font-style: italic;">Page 1 of 1</div>
                <div style="font-weight: bold;">FM-PPO-14</div>
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
                  "
                >
                  No.
                </div>
              </td>
            </tr>
          </table>
        </tr>
      </table>
    </div>
    @endforeach
  </body>
</html>
