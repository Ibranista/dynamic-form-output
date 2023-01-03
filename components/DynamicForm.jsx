import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "./DynamicForm.module.css";
// import framer motion
import { motion, AnimatePresence } from "framer-motion";

function DynamicForm() {
  const modalRef = useRef();
  const [groups, setGroups] = useState([
    { name: "group 1", slots: [{ value: "" }], value: "" },
  ]);

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
      <nav className="flex justify-between items-center bg-gray-100 p-3 px-10">
        <div className="flex gap-3 items-center">
          <img
            src="https://www.pngfind.com/pngs/m/530-5309946_to-google-forms-google-forms-logo-png-transparent.png"
            alt="logo"
            className="w-10 cursor-pointer"
          />
          <h1 className="text-2xl font-bold cursor-pointer">Dynamic Form</h1>
        </div>
        <div className="flex gap-3 items-center">
          <a
            href="https://github.com/Ibranista/DynamicForms"
            className="bg-slate-500 text-white px-2 w-30 rounded-sm mt-5 ml-5 hover:bg-blue-600 active:bg-slate-500"
          >
            Documentation
          </a>
          <button
            type="button"
            onClick={() => modalRef.current.showModal()}
            className="bg-slate-500 text-white px-2 w-30 rounded-sm mt-5 ml-5 hover:bg-blue-600 active:bg-slate-500"
          >
            About
          </button>
        </div>
      </nav>
      <Modal ref={modalRef} />
      <div className=" border-2 border-gray-300 container m-auto mt-2">
        <section className="bg-gray-300 p-2">Grupos / Slots</section>
        <form className="mt-5 overflow-hidden">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex  gap-5 justify-between">
              {/* groups section */}
              <div className="groupWrapper w-2/5 ">
                <h1 className="flex gap-7 bg-white border-y-2 w-[800px] font-bold">
                  <span>#</span>Grupo
                </h1>
                <div className="flex gap-3  self-start mt-1 p-5">
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
                <h1 className="bg-white border-y-2 font-bold">Slot</h1>
                {group.slots.map((slot, slotIndex) => (
                  <>
                    <hr className=" bg-gray-400 mb-3 mt-1" />
                    <div key={slotIndex} className="flex gap-4 p-5">
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
                  className="mb-4 bg-[#00E4FF] text-white px-2 w-30 rounded-sm mt-5 ml-5 hover:bg-blue-600 active:bg-[#00E4FF]"
                >
                  + Add Slot
                </button>
              </div>
            </div>
          ))}
          <section className="bg-gray-100 p-3">
            <motion.button
              type="button"
              onClick={handleAddGroup}
              className="bg-blue-600 px-3 text-white rounded-sm hover:bg-blue-900 active:bg-blue-600"
            >
              + Add Group
            </motion.button>
          </section>
        </form>
      </div>
    </>
  );
}
const Modal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      showModal: () => setShow(true),
      hideModal: () => setShow(false),
    };
  });

  const handleClose = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className={styles.modalBackdrop}
          />
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            className={styles.modalContentWrapper}
          >
            <motion.div
              initial={{
                x: 100,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: 100,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
                opacity: 0,
              }}
              className="modal-content"
            >
              {props.children}
              <div>
                <button
                  onClick={handleClose}
                  className="bg-red-600 text-white px-2 w-30 rounded-sm mt-5 ml-5 hover:bg-blue-600 active:bg-red-600"
                >
                  Close
                </button>
                <h1 className="font-bold text-2xl text-center mb-10">
                  About the Creator
                </h1>
                <div className="author-details text-center">
                  <h1 className="text-xl mb-2"> Name: Ibrahim Kedir</h1>
                  <h1 className="text-xl mb-2">
                    {" "}
                    Background: BSC in software engineering
                  </h1>
                  <h1 className="text-xl mb-2">
                    {" "}
                    Email: techofreact@gmail.com
                  </h1>
                  <h1 className="text-xl mb-2">
                    {" "}
                    Email: javascriptlearner3@gmail.com
                  </h1>
                  <h1 className="text-xl mb-2">Phone: +251919892275</h1>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
export default DynamicForm;
