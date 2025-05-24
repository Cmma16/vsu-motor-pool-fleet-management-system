<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Trip Ticket (Inline CSS)</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; background-color: #ffffff; margin: 0; padding: 0;">
  <div style="max-width: 64rem; margin: 0 auto; padding: 1.5rem; background-color: white;">
    <!-- Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 4rem; height: 4rem; background-color: #22543d; border-radius: 0.25rem; display: flex; align-items: center; justify-content: center;">
          <div style="color: white; font-size: 0.75rem; font-weight: bold;">VSU</div>
        </div>
        <div>
          <div style="font-size: 1.5rem; font-weight: bold; color: #1a202c;">VISAYAS</div>
          <div style="font-size: 0.875rem; color: #718096;">STATE UNIVERSITY</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 4rem; height: 4rem; background-color: #276749; border-radius: 0.25rem; display: flex; align-items: center; justify-content: center;">
          <div style="color: white; font-size: 0.75rem;">🏢</div>
        </div>
        <div>
          <div style="font-size: 1.125rem; font-weight: bold; color: #1a202c;">MOTOR POOL</div>
          <div style="font-size: 1.125rem; font-weight: bold; color: #1a202c;">SERVICES UNIT</div>
          <div style="font-size: 0.875rem; color: #718096;">PHYSICAL PLANT OFFICE</div>
        </div>
      </div>
    </div>

    <!-- Title -->
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <h1 style="font-size: 1.25rem; font-weight: bold; margin: 0;">TRIP TICKET</h1>
    </div>

    <!-- Basic Information -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 1.5rem;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8rem;">Date Filed</span>
          <span>:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;">Carlos</div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8rem;">Scheduled Travel Date/s</span>
          <span>:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8rem;">Departure Time</span>
          <span>:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8rem;">Purpose</span>
          <span>:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="border-bottom: 1px solid #cbd5e0; margin-top: 0.5rem;"></div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 6rem;">Trip Number</span>
          <span>:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 6rem;">Destination</span>
          <span>:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 6rem;">Driver will report to</span>
          <span>:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="border-bottom: 1px solid #cbd5e0; margin-top: 0.5rem;"></div>
      </div>
    </div>

    <!-- Head of Party Table -->
    <div style="margin-bottom: 1.5rem;">
      <div style="margin-bottom: 0.5rem; font-weight: 600;">Head of Party:</div>
      <table style="width: 100%; border: 1px solid #cbd5e0; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f7fafc;">
            <th style="border: 1px solid #cbd5e0; padding: 0.5rem; text-align: left; width: 33%;">Passengers</th>
            <th style="border: 1px solid #cbd5e0; padding: 0.5rem; text-align: left; width: 50%;">Department/Office/Center/Project</th>
            <th style="border: 1px solid #cbd5e0; padding: 0.5rem; text-align: left; width: 17%;">Contact Number(s)</th>
          </tr>
        </thead>
        <tbody>
          <!-- Sample 10 rows -->
          <tr>
            <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 2rem;"><span style="font-size: 0.875rem;">1.</span></td>
            <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 2rem;"></td>
            <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 2rem;"></td>
          </tr>          
<tr>
            <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 2rem;"><span style="font-size: 0.875rem;">1.</span></td>
            <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 2rem;"></td>
            <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 2rem;"></td>
          </tr>
          <!-- Repeat similar rows if needed -->
        </tbody>
      </table>
      <div style="font-size: 0.75rem; font-style: italic; margin-top: 0.25rem;">*For more than (10) passengers, use separate sheet.</div>
    </div>

    <!-- Vehicle Information -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 1.5rem;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8rem;">Vehicle Type:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8rem;">Vehicle Plate No.:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8rem;">Requesting party:</span>
          <div style="flex: 1; border-bottom: 1px solid #cbd5e0;"></div>
        </div>
        <div style="text-align: center; font-size: 0.75rem;">(Designation/Position)</div>
      </div>
    </div>

    <!-- Approval Section -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
      <div style="text-align: center;">
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Dispatched:</div>
        <div style="border-bottom: 1px solid #cbd5e0; margin-bottom: 0.5rem; height: 2rem;"></div>
        <div style="font-size: 0.75rem;">Maintenance in Charge</div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Recommended:</div>
        <div style="font-weight: bold; margin-bottom: 0.5rem;">MARLON G. BURLAS</div>
        <div style="font-size: 0.75rem;">Motor Pool Services Head</div>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Approved:</div>
        <div style="font-weight: bold; margin-bottom: 0.5rem;">MARIO LILIO P. VALENZONA</div>
        <div style="font-size: 0.75rem;">(Director/Center Director/Agency Head)</div>
      </div>
    </div>

<!-- Instructions -->
    <div style="margin-bottom: 1rem;">
      <div style="background-color: #f7fafc; padding: 0.5rem; font-size: 0.75rem;">
        <strong>INSTRUCTIONS:</strong> <em>Drivers shall fill in this part properly. Drivers are accountable for and are responsible for reporting any vehicle damage, defects and accidents immediately</em>
      </div>
    </div>

    <!-- Trip Details Table: Outbound -->
    <table style="width: 100%; border: 1px solid #cbd5e0; border-collapse: collapse; margin-bottom: 1rem;">
      <thead>
        <tr style="background-color: #f7fafc;">
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Trip Ticket Issued/Received</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Vehicle Condition (Before Travel)</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Fuel & Lubricant Issued/Used</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Departure/ Time Out</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Odometer/Mileage Out</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 3rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
        </tr>
      </tbody>
    </table>

    <!-- Trip Details Table: Inbound -->
    <table style="width: 100%; border: 1px solid #cbd5e0; border-collapse: collapse; margin-bottom: 1.5rem;">
      <thead>
        <tr style="background-color: #f7fafc;">
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Date Returned</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Vehicle Condition (After Travel)</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Fuel & Lubricant Balanced</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Arrival/ Time In</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; font-size: 0.75rem;">Odometer/Mileage In</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 3rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
        </tr>
      </tbody>
    </table>

<!-- Questions Section -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1rem; font-size: 0.75rem;">
      <div>
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Was the passenger/s following the call time & location?</div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="yes1"><label for="yes1">Yes</label></div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="no1"><label for="no1">No</label></div>
      </div>
      <div>
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Was there any purchase of fuel/lubricant outside VSU Campus?</div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="yes2"><label for="yes2">Yes (Specify)</label></div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="no2"><label for="no2">No</label></div>
      </div>
      <div>
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Was the vehicle involved in accident or damaged while in your custody?</div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="yes3"><label for="yes3">Yes (Specify)</label></div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="no3"><label for="no3">No</label></div>
      </div>
      <div>
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Was the vehicle used other than official government business?</div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="yes4"><label for="yes4">Yes (Specify)</label></div>
        <div style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" id="no4"><label for="no4">No</label></div>
      </div>
    </div>

    <!-- Driver's Name & Signature -->
    <div style="margin-bottom: 1rem;">
      <div style="background-color: #fefcbf; padding: 0.5rem; text-align: center; font-weight: 600; font-size: 0.875rem;">Driver's Name & Signature</div>
      <div style="background-color: #fefcbf; padding: 0.5rem; text-align: center; font-size: 0.75rem;">Filled in by the Head of Party or Requesting Party</div>
    </div>

<!-- Rating Section -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
      <div style="border: 1px solid #cbd5e0; padding: 1rem; font-size: 0.75rem;">
        <div style="margin-bottom: 0.5rem; font-style: italic;">
          This vehicle will be used for official government business only. I have reviewed and complied with rules & regulations regarding the use of Government-Owned Vehicle.
        </div>
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Service Satisfaction</div>
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <label><input type="checkbox"> 1. Not Satisfied</label>
          <label><input type="checkbox"> 2. Slightly Satisfied</label>
          <label><input type="checkbox"> 3. Moderately Satisfied</label>
          <label><input type="checkbox"> 4. Very Satisfied</label>
          <label><input type="checkbox"> 5. Extremely Satisfied</label>
        </div>
      </div>
      <div style="border: 1px solid #cbd5e0; padding: 1rem; font-size: 0.75rem;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Driver's OVER ALL RATING</div>
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <div><label><input type="checkbox"> 1. - Poor</label> <label style="margin-left: 1rem;"><input type="checkbox"> 2. - Fair</label></div>
          <div><label><input type="checkbox"> 3. - Good</label> <label style="margin-left: 1rem;"><input type="checkbox"> 4. - Very Good</label></div>
          <div><label><input type="checkbox"> <span style="background-color: #fefcbf; padding: 0 0.25rem;">5. - Excellent</span></label></div>
        </div>
        <div style="margin-top: 1rem;">
          <div style="background-color: #fefcbf; padding: 0.5rem; font-size: 0.75rem; font-weight: 600;">Comments & Suggestions</div>
          <div style="border: 1px solid #cbd5e0; height: 4rem; margin-top: 0.25rem;"></div>
        </div>
      </div>
    </div>

    <!-- Signature Section -->
    <table style="width: 100%; border: 1px solid #cbd5e0; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.75rem;">
      <thead>
        <tr style="background-color: #f7fafc;">
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; width: 50%;">SIGNATURE OVER PRINTED NAME</th>
          <th style="border: 1px solid #cbd5e0; padding: 0.5rem; width: 50%;">Name and Signature</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem; height: 4rem;"></td>
          <td style="border: 1px solid #cbd5e0; padding: 0.5rem;"></td>
        </tr>
      </tbody>
    </table>

<!-- Footer -->
    <div style="display: flex; align-items: flex-end; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 3rem; height: 3rem; background-color: #276749; border-radius: 0.25rem; display: flex; align-items: center; justify-content: center;">
          <div style="color: white; font-size: 0.75rem;">🏢</div>
        </div>
        <div style="font-size: 0.75rem;">
          <div style="font-weight: bold;">MOTOR POOL SERVICES UNIT</div>
          <div>Visayas State University, PQVR+8JR Baybay City, Leyte</div>
          <div>Email: mpsu@vsu.edu.ph</div>
          <div>Website: www.vsu.edu.ph</div>
          <div>Phone: +63 53 565 0600 Local 1068</div>
        </div>
      </div>
      <div style="text-align: right; font-size: 0.75rem;">
        <div>Page 1 of 1</div>
        <div style="font-weight: bold;">FM-PPO-14</div>
        <div>V2.xx.xx.xxxx</div>
        <div style="background-color: #edf2f7; padding: 0.25rem 0.5rem; margin-top: 0.5rem;">No. ______</div>
      </div>
    </div>


  </div>
</body>
</html>
