<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @page {
        margin: 48px 96px 15px 90px; /* top, right, bottom, left */
      }

      body {
        margin: 0;
        padding: 0;
      }
    </style>
    <title>Vehicle Maintenace Record</title>
  </head>
  <body>
    <div
      style="
          max-width: 1000px;
          margin: 0 auto;
          background-color: white;
          font-family: Arial, sans-serif;
          font-size: 13px;
      "
    >
      <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
        <!-- Header Section -->
      <tr>
          <td>
            <table style="width: 100%;">
              <tr>
                <td style="width: 42%; border-right: 3.5px solid #1A311D; ">
                    <img src="./vsu-logo-new.png" alt="ppo-logo" style="height: 90px; width: auto;" />
                </td>
                <td style="width: 50%;">
                    <table>
                      <tr>
                        <td>
                          <img src="./ppo-logomark.png" alt="ppo-logo" style="height: 75px; width: auto; padding-left: 6px;" />
                        </td>
                        <td style="padding-left: 4px;">
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
          <div style="font-size: 15px; font-weight: bold; margin: 4px; padding: 4px;">VEHICLE MAINTENANCE RECORD</div>
        </tr>
        <!-- Maintenance Overview -->
        <tr>
          <table style="width: 100%;">
            <tr>
              <td style="width: 14%">
                <span>Vehicle Type:</span>
              </td>
              <td style="padding-right: 4px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->serviceRequest->vehicle->model}}</div>
              </td>
              <td style="width: 14%">
                <span>Engine #:</span>
              </td>
              <td style="padding-right: 4px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->serviceRequest->vehicle->engine_number}}</div>
              </td>
              <td style="width: 17%">
                <span>Last PM (km):</span>
              </td>
              <td style="">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center"></div>
              </td>
            </tr>
            <tr>
              <td style="width: 14%">
                <span>Vehicle #:</span>
              </td>
              <td style="padding-right: 4px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->serviceRequest->vehicle->vehicle_name}}</div>
              </td>
              <td style="width: 14%">
                <span>Chassis #:</span>
              </td>
              <td style="padding-right: 4px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->serviceRequest->vehicle->chassis_number}}</div>
              </td>
              <td style="width: 17%">
                <span>Date In:</span>
              </td>
              <td style="">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->formatted_date_in}}</div>
              </td>
            </tr>
            <tr>
              <td style="width: 14%">
                <span>Department:</span>
              </td>
              <td style="padding-right: 4px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->serviceRequest->vehicle->location}}</div>
              </td>
              <td style="width: 14%">
                <span>Odometer:</span>
              </td>
              <td style="padding-right: 4px;">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->serviceRequest->vehicle->latestOdometerLog->reading}} km</div>
              </td>
              <td style="width: 17%">
                <span>Date Completed:</span>
              </td>
              <td style="">
                <div style="border-bottom: 1px solid #000000; height: 12px; width: 100%; text-align: center">{{$data->formatted_date_completed}}</div>
              </td>
            </tr>
          </table>
        </tr>
        <!-- Maintenance description section -->
        <tr>
          <table style="width: 100%; margin: 26px 0 0 0; border-collapse: collapse;">
            <thead style="">
              <tr>
                <th style="border: 1px solid #000; font-size: 14px;">Description of repair and maintenance conducted</th>
              </tr>
            </thead>
            <tbody style="">
                <tr>
                  <td style="border: 1px solid #000; text-align: center; height: 20px;">{{$data->maintenance_summary}}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #000; text-align: center; height: 20px;"></td>
                </tr>
                <tr>
                  <td style="border: 1px solid #000; text-align: center; height: 20px;"></td>
                </tr>
                <tr>
                  <td style="border: 1px solid #000; text-align: center; height: 20px;"></td>
                </tr>
                <tr>
                  <td style="border: 1px solid #000; text-align: center; height: 20px;"></td>
                </tr>
            </tbody>
          </table>
        </tr>
        <!-- Parts used section -->
        <tr>
          <table style="width: 100%; margin: 16px 0 0 0; border-collapse: collapse;" cellpadding="0" cellspacing="0">
            <thead style="">
              <tr>
                <th style="border: 2px solid #000; width: 30%; font-size: 14px;">Material/s Used</th>
                <th style="border: 2px solid #000; width: 33%; font-size: 14px;">Third Party repair and maintenance</th>
              </tr>
            </thead>
            <tbody style="line-height: 1;">
                <tr>
                  <td style="border: 1px solid #000; text-align: center;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <tr>
                            <th style="font-weight: normal; padding: 4px 0; width: 7%; border: 1px solid #000; ">Qty.</th>
                            <th style="font-weight: normal; padding: 4px 0; width: 7%; border: 1px solid #000; ">Part #.</th>
                            <th style="font-weight: normal; padding: 4px 0; width: 15%; border: 1px solid #000; ">Description</th>
                            <th style="font-weight: normal; padding: 4px 0; width: 7%; border: 1px solid #000; ">Unit Cost</th>
                            <th style="font-weight: normal; padding: 4px 0; width: 7%; border: 1px solid #000; ">Total</th>
                        </tr>
                        @foreach ($data->partsUsed as $partUsed)
                            <tr>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; text-align: center;">{{$partUsed->quantity_used}} {{$partUsed->part->unit}}</td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; text-align: center;">{{$partUsed->part_id}}</td>
                                <td style="height: 24px; padding: 4px 0; width: 15%; border: 1px solid #000; text-align: center;">{{$partUsed->part->part_name}}</td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; text-align: center;">{{$partUsed->part->unit_price}}</td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; text-align: center;">{{number_format($partUsed->quantity_used * $partUsed->part->unit_price, 2)}}</td>
                            </tr>
                        @endforeach
                        @for ($i = $data->partsUsed->count(); $i < 7; $i++)
                            <tr>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 15%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                            </tr>
                        @endfor
                    </table>
                  </td>
                  <td style="border: 1px solid #000; text-align: center;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <tr>
                            <th style="font-weight: normal; padding: 4px 0; width: 7%; border: 1px solid #000; ">Date</th>
                            <th style="font-weight: normal; padding: 4px 0; width: 7%; border: 1px solid #000; ">Qty.</th>
                            <th style="font-weight: normal; padding: 4px 0; width: 15%; border: 1px solid #000; ">Description</th>
                            <th style="font-weight: normal; padding: 4px 2px; width: 7%; border: 1px solid #000; ">Unit Cost</th>
                            <th style="font-weight: normal; padding: 4px 0; width: 7%; border: 1px solid #000; ">Total</th>
                        </tr>
                        @for ($i = 0; $i < 7; $i++)
                            <tr>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 15%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                                <td style="height: 24px; padding: 4px 0; width: 7%; border: 1px solid #000; "></td>
                            </tr>
                        @endfor
                    </table>
                  </td>
                </tr>
            </tbody>
          </table>
        </tr>
        <!-- Summary section -->
        <tr>
            <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                <tr>
                    <th style="border: 1px solid #000; height: 12px;" colspan="2">Repair and Maintenace Summary</th>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px;"></td>
                </tr>
                @php
                    $materialCost = 0;
                    foreach($data->partsUsed as $partUsed)
                    {
                      $materialCost += $partUsed->quantity_used * $partUsed->part->unit_price;
                    }
                @endphp
                <tr>
                    <td style="border: 1px solid #000; height: 12px; width: 17.15%; padding: 0 0 0 4px;">Material cost</td>
                    <td style="border: 1px solid #000; height: 12px; width: 11.15%; text-align: center;">P{{number_format($materialCost, 2)}}</td>
                    <td style="height: 12px; width: 2.5%;"></td>
                    <th style="border-bottom: 1px solid #000; height: 12px; width: 29%; vertical-align: bottom;">{{strtoupper($data->requested_by_name)}}</th>
                    <td style="height: 12px; width: 2.5%;"></td>
                    <td style="height: 12px; width: 10.9%; padding: 0 4px 0 0;">Next PM (km)</td>
                    <td style="border-bottom: 1px solid #000; height: 12px; width: 15.1%;"></td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; height: 12px; padding: 0 0 0 4px;">Third party repair cost</td>
                    <td style="border: 1px solid #000; height: 12px;"></td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px; padding: 0 12px; text-align: center;">SIGNATURE OVER PRINTED NAME <span style="font-style: italic;">(Driver)</span></td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px;" colspan="2"></td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; height: 26px; padding: 0 0 0 4px; font-weight: bold;">Total</td>
                    <th style="border: 1px solid #000; height: 12px;">P{{number_format($materialCost, 2)}}</th>
                    <td style="height: 12px;"></td>
                    <th style="border-bottom: 1px solid #000; height: 12px; vertical-align: bottom;">{{strtoupper($data->performed_by_name)}}</th>
                    <td style="height: 12px;"></td>
                    <th style="border-bottom: 1px solid #000; height: 12px; vertical-align: bottom;" colspan="2"></th>
                </tr>
                <tr>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px; padding: 0 20px; text-align: center;">
                        SIGNATURE OVER PRINTED NAME <span style="font-style: italic;">(Mechanic)</span>
                    </td>
                    <td style="height: 12px;"></td>
                    <td style="height: 12px; padding: 0 22px; text-align: center;" colspan="2">
                        SIGNATURE OVER PRINTED NAME <span style="font-style: italic;">(Third Party Mechanic)</span>
                    </td>
                </tr>
            </table>
        </tr>
        <!-- Other details section -->
        <tr>
            <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width: 60%; height: 26px;">
                        <table style="width: 100%; border-collapse: collapse;" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding: 0 0 0 4px; width: 23%; height: 26px;">Date accepted: </td>
                                <td style="width: 4%; height: 26px;"></td>
                                <td style="width: 25%; border-bottom: 1px solid #000; height: 26px; text-align: center; vertical-align: bottom;">{{$data->formatted_date_confirmed}}</td>
                                <td style="width: 39%; height: 26px;"></td>
                            </tr>
                            <tr>
                                <td style="padding: 0 0 0 4px; height: 26px; vertical-align: bottom;">Verified &</td>
                                <td style="height: 26px;"></td>
                                <th style="border-bottom: 1px solid #000; height: 26px; vertical-align: bottom;" colspan="2">{{strtoupper($data->confirmed_by_name)}}</th>
                            </tr>
                            <tr>
                                <td style="padding: 0 0 0 4px; vertical-align: top;">recorded by:</td>
                                <td style=""></td>
                                <td style="padding: 0 4px 0 4px; text-align: center;" colspan="2">
                                    SIGNATURE OVER PRINTED NAME <span style="font-style: italic;">(Fleet Management in charge)</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 40%; height: 26px;"></td>
                </tr>
            </table>
        </tr>
        <!-- Footer section -->
        <tr>
          <table style="width: 100%; border-top: 2px solid #1A311D;  margin: 48px 0 0 0; border-collapse: collapse; font-size: 10px;">
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
                <div style="font-weight: bold;">FM-PPO-23</div>
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
  </body>
</html>
