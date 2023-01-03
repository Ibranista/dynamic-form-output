import React from "react";
import { useState } from "react";

function DynamicForm() {
  const [groups, setGroups] = useState([
    { name: "Group 1", slots: [{ value: "" }], value: "" },
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
      { name: `Group ${groupNumber}`, slots: [{ value: "" }], value: "" },
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
        <section className="bg-gray-300 p-2">Gupos / Slots</section>
        <form>
          {groups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h1>Groups</h1>
              <button
                type="button"
                onClick={() => handleRemoveGroup(groupIndex)}
              >
                X
              </button>
              <input
                type="text"
                value={group.value}
                placeholder={`${group.name} value`}
                onChange={(e) => handleGroupInputChange(e, groupIndex)}
              />
              <h2>Slots</h2>
              {group.slots.map((slot, slotIndex) => (
                <div key={slotIndex}>
                  <input
                    type="text"
                    value={slot.value}
                    placeholder={`${group.name} slot ${slotIndex + 1}`}
                    onChange={(e) => handleSlotChange(e, groupIndex, slotIndex)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(groupIndex, slotIndex)}
                  >
                    X
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddSlot(groupIndex)}>
                Add Slot
              </button>
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
