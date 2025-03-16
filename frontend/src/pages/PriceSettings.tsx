import React, { useState } from 'react'

const PriceSettings = () => {
  const [label, setLabel] = useState('')
  const [value, setValue] = useState(0);

  return (
    <div>
      <h1 className="text-5xl mb-15">Change Price Information</h1>
      <form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <label className="text-xl" htmlFor="label">
              Commission Type Label:
              <input
                onChange={(e) => setLabel(e.target.value)}
                value={label}
                id="label"
                className="block mt-2 text-base"
                type="text"
                placeholder="Headshot, Flat colors, e.t.c."
              />
            </label>
            <label className="text-xl" htmlFor="value">
              Price:
              <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                id="value"
                className="block mt-2 text-base"
                type="text"
                placeholder="Price in prefered currency"
              />
            </label>

            
      </div>
      <div className="flex flex-col items-center">
            <button className="mt-20 bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
            Add New Type
            </button>
          </div>
      </form>
    </div>
  )
}

export default PriceSettings
