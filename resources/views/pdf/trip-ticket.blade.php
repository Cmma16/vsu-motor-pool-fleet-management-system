<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Trip Ticket (Dompdf Safe)</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
      }
      .container {
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        padding: 20px;
      }
      .flex-row {
        display: table;
        width: 100%;
      }
      .flex-col {
        display: table-cell;
        vertical-align: top;
      }
      .logo-box,
      .icon-box {
        width: 64px;
        height: 64px;
        background-color: #22543d;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
        line-height: 64px;
      }
      .heading {
        font-size: 24px;
        font-weight: bold;
        color: #1a202c;
      }
      .subheading {
        font-size: 14px;
        color: #718096;
      }
      .title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .info-table {
        width: 100%;
        margin-bottom: 20px;
        border-collapse: collapse;
      }
      .info-row {
        margin-bottom: 10px;
      }
      .info-label {
        width: 150px;
        display: inline-block;
      }
      .underline {
        display: inline-block;
        border-bottom: 1px solid #cbd5e0;
        width: 70%;
      }
      table.passenger-table {
        width: 100%;
        border: 1px solid #cbd5e0;
        border-collapse: collapse;
      }
      table.passenger-table th,
      table.passenger-table td {
        border: 1px solid #cbd5e0;
        padding: 5px;
        font-size: 12px;
        vertical-align: top;
      }
      table.passenger-table th {
        background-color: #f7fafc;
      }
      .section {
        margin-bottom: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header with logos and titles -->
      <div style="text-align: center">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <!-- Left: VSU Logo and Name -->
          <div style="display: flex; align-items: center">
            <div class="icon-box" style="background-color: #276749">🏢</div>
            <div style="padding-left: 10px">
              <div class="heading" style="font-size: 16px">VISAYAS</div>
              <div class="subheading">STATE UNIVERSITY</div>
            </div>
          </div>

          <!-- Right: Motorpool Logo and Name -->
          <div style="display: flex; align-items: center">
            <div class="icon-box" style="background-color: #276749">🏢</div>
            <div style="padding-left: 10px">
              <div class="heading" style="font-size: 16px">
                MOTOR POOL SERVICES UNIT
              </div>
              <div class="subheading">PHYSICAL PLANT OFFICE</div>
            </div>
          </div>
        </div>
        <h2 style="margin-top: 20px; margin-bottom: 10px">TRIP TICKET</h2>
      </div>

      <!-- Title -->
      <div
        style="
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        "
      >
        TRIP TICKET
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px">
        <tr>
          <!-- Column 1 -->
          <td style="width: 50%; vertical-align: top; padding: 5px 10px">
            <div style="margin-bottom: 10px">
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  margin-right: 5px;
                "
                >Date Filed:</span
              >
              <span
                style="
                  display: inline-block;
                  border-bottom: 1px solid #000;
                  width: 70%;
                  height: 14px;
                  vertical-align: bottom;
                "
              >
                {{ $trip->date_filed }}
              </span>
            </div>
            <div style="margin-bottom: 10px">
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  margin-right: 5px;
                "
                >Scheduled Travel Date/s:</span
              >
              <span
                style="
                  display: inline-block;
                  border-bottom: 1px solid #000;
                  width: 70%;
                  height: 14px;
                  vertical-align: bottom;
                "
              >
                {{ $trip->start_date }} - {{ $trip->end_date }}
              </span>
            </div>
            <div style="margin-bottom: 10px">
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  margin-right: 5px;
                "
                >Departure Time:</span
              >
              <span
                style="
                  display: inline-block;
                  border-bottom: 1px solid #000;
                  width: 70%;
                  height: 14px;
                  vertical-align: bottom;
                "
              >
                {{ $trip->departure_time }}
              </span>
            </div>
            <div style="margin-bottom: 10px">
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  margin-right: 5px;
                "
                >Purpose:</span
              >
              <span
                style="
                  display: inline-block;
                  border-bottom: 1px solid #000;
                  width: 70%;
                  height: 14px;
                  vertical-align: bottom;
                "
              >
                {{ $trip->purpose }}
              </span>
            </div>
          </td>

          <!-- Column 2 -->
          <td style="width: 50%; vertical-align: top; padding: 5px 10px">
            <div style="margin-bottom: 10px">
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  margin-right: 5px;
                "
                >Trip Number:</span
              >
              <span
                style="
                  display: inline-block;
                  border-bottom: 1px solid #000;
                  width: 70%;
                  height: 14px;
                  vertical-align: bottom;
                "
              >
                {{ $trip->trip_number }}
              </span>
            </div>
            <div style="margin-bottom: 10px">
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  margin-right: 5px;
                "
                >Destination:</span
              >
              <span
                style="
                  display: inline-block;
                  border-bottom: 1px solid #000;
                  width: 70%;
                  height: 14px;
                  vertical-align: bottom;
                "
              >
                {{ $trip->destination }}
              </span>
            </div>
            <div style="margin-bottom: 10px">
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  margin-right: 5px;
                "
                >Driver will report to:</span
              >
              <span
                style="
                  display: inline-block;
                  border-bottom: 1px solid #000;
                  width: 70%;
                  height: 14px;
                  vertical-align: bottom;
                "
              >
                &nbsp;
              </span>
            </div>
          </td>
        </tr>
      </table>

      <!-- Head of Party -->
      <div class="section">
        <div style="margin-bottom: 10px; font-weight: bold">
          Head of Party: {{ $trip->party_head }}
        </div>
        <table class="passenger-table">
          <thead>
            <tr>
              <th>Passengers</th>
              <th>Department/Office/Center/Project</th>
              <th>Contact Number(s)</th>
            </tr>
          </thead>
          <tbody>
            @for ($i = 1; $i <= 10; $i++)
            <tr>
              <td>{{ $i }}.</td>
              <td></td>
              <td></td>
            </tr>
            @endfor
          </tbody>
        </table>
        <div style="font-size: 10px; font-style: italic; margin-top: 5px">
          *For more than (10) passengers, use separate sheet.
        </div>
      </div>

      <!-- Vehicle Information -->
      <div class="section">
        <div class="info-row">
          <span class="info-label">Vehicle Type:</span>
          <span class="underline"></span>
        </div>
        <div class="info-row">
          <span class="info-label">Vehicle Plate No.:</span>
          <span class="underline"></span>
        </div>
        <div class="info-row">
          <span class="info-label">Requesting Party:</span>
          <span class="underline"></span>
        </div>
      </div>

      <!-- Add other sections similarly -->
    </div>
  </body>
</html>
