import React from 'react'

import { Plus, ClipboardCheck } from "lucide-react";

export function QuickActionsPanel() {
  return (
    <>
        <div className="p-4 flex gap-2 self-end">
          <button className="flex gap-3 group">
            <span className="flex items-center justify-center size-8 p-1.5 rounded-4xl group-hover:bg-[#006600] bg-white">
              <ClipboardCheck className="text-[#006600] group-hover:text-white" />
            </span>
            <div className="lg:flex flex-col hidden group-hover:text-[#006600] text-left w-40 text-xs">
              <span className="font-bold">Assign</span>
              <p>Allocate a vehicle to a specific driver</p>
            </div>
          </button>
          <button className="flex gap-3 group">
            <span className="flex items-center justify-center size-8 p-1.5 rounded-4xl group-hover:bg-[#006600] bg-white">
              <Plus className="text-[#006600] group-hover:text-white" />
            </span>
            <div className="lg:flex flex-col hidden group-hover:text-[#006600] text-left w-40 text-xs">
              <span className="font-bold">Quick Add</span>
              <p>Easily add a vehicle, personnel, repair, etc.</p>
            </div>
          </button>
        </div>
    </>
  )
}
