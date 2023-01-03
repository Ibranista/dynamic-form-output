import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee as coffeeIconDefinition,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function DynamicForm() {
  const [groups, setGroups] = useState([
    { name: "group 1", slots: [{ value: "" }], value: "" },
  ]);

  const handleGroupChange = (e, groupIndex) => {
    const values = [...groups];
    values[groupIndex].name = e.target.value;
    setGroups(values);
  };

  const handleSlotChange = (e, groupIndex, slotIndex) => {
    const values = [...groups];
    values[groupIndex].slots[slotIndex].value = e.target.value;
    setGroups(values);
  };

  const handleGroupInputChange = (e, groupIndex) => {
    const values = [...groups];
    values[groupIndex].value = e.target.value;
    setGroups(values);
  };

  const handleAddGroup = () => {
    const groupNumber = groups.length + 1;
    setGroups([
      ...groups,
      { name: `group ${groupNumber}`, slots: [{ value: "" }], value: "" },
    ]);
  };

  const handleRemoveGroup = (groupIndex) => {
    const values = [...groups];
    values.splice(groupIndex, 1);
    setGroups(values);
  };

  const handleAddSlot = (groupIndex) => {
    const values = [...groups];
    const slotNumber = values[groupIndex].slots.length + 1;
    values[groupIndex].slots.push({ value: "" });
    setGroups(values);
  };

  const handleRemoveSlot = (groupIndex, slotIndex) => {
    const values = [...groups];
    values[groupIndex].slots.splice(slotIndex, 1);
    setGroups(values);
  };

  return (
    <>
      <div className=" border-2 border-gray-300 container m-auto">
        <section className="bg-gray-300 p-2">Grupos / Slots</section>
        <form className="mt-5">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex  gap-5">
              {/* groups section */}
              <div className="groupWrapper w-2/5">
                <h1 className="flex gap-7 bg-white border-y-2">
                  <span>#</span>Grupo
                </h1>
                <div className="groups bg-orange-400 flex gap-3  self-start mt-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveGroup(groupIndex)}
                    className="bg-red-600 text-white rounded-sm w-8 h-8 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="text"
                    value={group.value}
                    placeholder={`${group.name} `}
                    onChange={(e) => handleGroupInputChange(e, groupIndex)}
                    className="h-8 rounded-sm border-2 border-gray-300 w-full"
                  />
                </div>
              </div>
              {/* slots section */}
              <div className="w-1/2">
                <h1 className="bg-white border-y-2">Slot</h1>
                {group.slots.map((slot, slotIndex) => (
                  <>
                    <hr className=" bg-gray-400 mb-3 mt-1" />
                    <div key={slotIndex} className="flex gap-4">
                      <input
                        type="text"
                        value={slot.value}
                        placeholder={`g${group.name.slice(5)}_slot ${
                          slotIndex + 1
                        }`}
                        onChange={(e) =>
                          handleSlotChange(e, groupIndex, slotIndex)
                        }
                        className="h-8 rounded-md border-2 border-gray-300 w-full"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(groupIndex, slotIndex)}
                        className="bg-red-600 text-white rounded-sm w-6 h-6 flex items-center justify-center"
                      >
                        <FontAwesomeIcon icon={faMinus} className="w-2" />
                      </button>
                    </div>
                  </>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddSlot(groupIndex)}
                  className="bg-blue-300 text-white px-2 w-30 rounded-sm mt-5"
                >
                  + Add Slot
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddGroup}>
            Add Group
          </button>
        </form>
      </div>
    </>
  );
}

export default DynamicForm;
