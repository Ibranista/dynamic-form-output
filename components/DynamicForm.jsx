import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./DynamicForm.module.css";
import { useEffect } from "react";
import localStorage from "localstorage-memory";
// import framer motion
import { motion, AnimatePresence, delay } from "framer-motion";

function DynamicForm() {
  const modalRef = useRef();
  // hooks
  const [formData, setFormData] = useState({
    title: "",
    abPairs: [{ a: "", b: "" }],
    groups: [{ g: "", cvPairs: [{ c: "", v: "" }] }],
  });
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    // split the name by '.' to get the keys for the formData object
    const keys = name.split(".");
    // update the value at the specified key in the formData object
    setFormData((prevFormData) => ({
      ...prevFormData,
      [keys[0]]:
        keys.length > 1
          ? keys[0] === "abPairs" // check if the field is 'abPairs'
            ? [...prevFormData[keys[0]]].map((pair, index) => {
                // update the value at the specified index
                return index === Number(keys[1])
                  ? { ...pair, [keys[2]]: value }
                  : pair;
              })
            : {
                ...prevFormData[keys[0]],
                [keys[1]]:
                  keys.length > 2
                    ? {
                        ...prevFormData[keys[0]][keys[1]],
                        [keys[2]]: value,
                      }
                    : value,
              }
          : value,
    }));
  };
  const handleGroupChange = (event) => {
    const { name, value } = event.target;
    // split the name by '.' to get the keys for the formData object
    const keys = name.split(".");
    // update the value at the specified key in the formData object
    setFormData((prevFormData) => ({
      ...prevFormData,
      [keys[0]]:
        keys.length > 1
          ? keys[0] === "groups" // check if the field is 'groups'
            ? [...prevFormData[keys[0]]].map((group, groupIndex) => {
                // update the value at the specified index
                return groupIndex === Number(keys[1])
                  ? {
                      ...group,
                      [keys[2]]:
                        keys.length > 3
                          ? [...group[keys[2]]].map((pair, pairIndex) => {
                              // update the value at the specified index
                              return pairIndex === Number(keys[3])
                                ? { ...pair, [keys[4]]: value }
                                : pair;
                            })
                          : value,
                    }
                  : group;
              })
            : {
                ...prevFormData[keys[0]],
                [keys[1]]:
                  keys.length > 2
                    ? {
                        ...prevFormData[keys[0]][keys[1]],
                        [keys[2]]: value,
                      }
                    : value,
              }
          : value,
    }));
  };
  const deleteABPair = (index) => {
    const newABPairs = [...formData.abPairs];
    newABPairs.splice(index, 1);
    setFormData({ ...formData, abPairs: newABPairs });
  };

  const addABPair = () => {
    setFormData({
      ...formData,
      abPairs: [...formData.abPairs, { a: "", b: "" }],
    });
  };

  const deleteCVPair = (groupIndex, pairIndex) => {
    const newGroups = [...formData.groups];
    const newCVPairs = [...newGroups[groupIndex].cvPairs];
    newCVPairs.splice(pairIndex, 1);
    newGroups[groupIndex] = { ...newGroups[groupIndex], cvPairs: newCVPairs };
    setFormData({ ...formData, groups: newGroups });
  };

  const addCVPair = (groupIndex) => {
    const newGroups = [...formData.groups];
    newGroups[groupIndex] = {
      ...newGroups[groupIndex],
      cvPairs: [...newGroups[groupIndex].cvPairs, { c: "", v: "" }],
    };
    setFormData({ ...formData, groups: newGroups });
  };

  const deleteGroup = (index) => {
    const newGroups = [...formData.groups];
    newGroups.splice(index, 1);
    setFormData({ ...formData, groups: newGroups });
  };

  const addGroup = () => {
    setFormData({
      ...formData,
      groups: [...formData.groups, { g: "", cvPairs: [{ c: "", v: "" }] }],
    });
  };
  const [storedFormData, setStoredFormData] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    setStoredFormData(storedFormData);
    setSubmitted(true);
  };

  // loader
  if (loading) {
    return (
      <>
        <motion.div
          className="flex justify-center items-center h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 4 }}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin text-5xl text-slate-500"
              />
            </div>
            <h1 className="text-2xl font-bold mt-2">Final Exam</h1>
          </div>
        </motion.div>
      </>
    );
  }
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
            href="https://github.com/Ibranista/dynamic-form-output#readme"
            className="bg-slate-500 text-white px-2 w-30 rounded-sm mt-5 ml-5 hover:bg-blue-600 active:bg-slate-500"
            target="_blank"
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
      <h1 className="font-bold text-center p-2">
        Nested Dynamic Form Final Question
      </h1>
      <motion.div
        className="sm:flex border-2 border-gray-300 container m-auto mt-2 mb-5 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form className="form-wrapper sm:w-1/2" onSubmit={handleSubmit}>
          <section className="bg-gray-200 p-5 flex justify-center gap-3">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={formData.title}
              onChange={handleChange}
              className="w-2/3 rounded-md border-2 border-gray-300 p-2 h-9 ml-8
              "
            />
            <motion.button
              type="button"
              onClick={() => setFormData({ ...formData, title: "" })}
              className="bg-red-600 text-white rounded-sm w-fit p-2 h-8 flex items-center justify-center relative top-1"
              title="removeSlots"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileDrag={{ scale: 1.1 }}
            >
              reset title
            </motion.button>
          </section>
          <h1 className="font-bold ml-36 py-2">A&B</h1>
          <section className="bg-gray-200 p-5">
            {formData.abPairs.map((pair, index) => (
              <div key={index} className="flex gap-5 justify-center">
                <input
                  type="text"
                  name={`abPairs.${index}.a`}
                  placeholder={`A${index + 1}`}
                  value={pair.a}
                  onChange={handleChange}
                  className="p-2 border-2 border-gray-300 rounded-md mb-3 w-1/4"
                />

                <input
                  type="text"
                  name={`abPairs.${index}.b`}
                  placeholder={`B${index + 1}`}
                  value={pair.b}
                  onChange={handleChange}
                  className="p-2 border-2 border-gray-300 rounded-md mb-3 w-1/4"
                />
                <motion.button
                  type="button"
                  onClick={() => deleteABPair(index)}
                  className="bg-red-600 text-white rounded-sm w-8 h-8 flex items-center justify-center relative top-2"
                  title="removeSlots"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileDrag={{ scale: 1.1 }}
                >
                  <FontAwesomeIcon icon={faMinus} className="w-3" />
                </motion.button>
              </div>
            ))}
            <motion.button
              type="button"
              onClick={addABPair}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileDrag={{ scale: 1.1 }}
              className="bg-blue-600 text-white rounded-sm w-fit px-3 flex items-center relative top-2 left-[80%]"
            >
              Add A&B
            </motion.button>
          </section>
          {/* groups section */}
          <h2 className="font-bold ml-36 py-2">Groups</h2>
          <section className="bg-gray-200 p-5">
            {formData.groups.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white w-full">
                <div className="flex justify-center bg-gray-200">
                  <input
                    type="text"
                    name={`groups.${groupIndex}.g`}
                    placeholder={`G${groupIndex + 1}`}
                    value={group.g}
                    onChange={handleGroupChange}
                    className="w-[65%] rounded-md border-2 border-gray-300 p-2 h-9 ml-8 mb-3 "
                  />
                </div>

                {/* section for Captions within group */}
                <h1 className="font-bold mb-3 ml-28">Captions</h1>
                {group.cvPairs.map((pair, pairIndex) => (
                  <div key={pairIndex} className="flex gap-5 justify-center">
                    <input
                      type="text"
                      name={`groups.${groupIndex}.cvPairs.${pairIndex}.c`}
                      placeholder={`C${pairIndex + 1}`}
                      value={pair.c}
                      onChange={handleGroupChange}
                      className="p-2 rounded-md mb-3 w-1/4 bg-gray-200"
                    />
                    <input
                      type="text"
                      name={`groups.${groupIndex}.cvPairs.${pairIndex}.v`}
                      placeholder={`V${pairIndex + 1}`}
                      value={pair.v}
                      onChange={handleGroupChange}
                      className="p-2 rounded-md mb-3 w-1/4 bg-gray-200"
                    />

                    <motion.button
                      type="button"
                      onClick={() => deleteCVPair(groupIndex, pairIndex)}
                      className="bg-red-600 text-white rounded-sm w-8 h-8 flex items-center justify-center relative top-2"
                      title="removeSlots"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      whileDrag={{ scale: 1.1 }}
                    >
                      <FontAwesomeIcon icon={faMinus} className="w-3" />
                    </motion.button>
                  </div>
                ))}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileDrag={{ scale: 1.1 }}
                  onClick={() => addCVPair(groupIndex)}
                  className="bg-blue-600 text-white rounded-sm w-fit px-3 flex items-center relative top-2 left-[80%] mb-5 cursor-pointer"
                >
                  Add C&V
                </motion.div>

                <motion.div
                  onClick={() => deleteGroup(groupIndex)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileDrag={{ scale: 1.1 }}
                  className="bg-red-600 text-white rounded-sm w-fit px-3 flex items-center relative mb-2 cursor-pointer"
                >
                  Delete Group
                </motion.div>
              </div>
            ))}
            <motion.div
              onClick={addGroup}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileDrag={{ scale: 1.1 }}
              className="bg-blue-600 text-white rounded-sm w-fit px-3 flex items-center relative left-36 cursor-pointer"
            >
              Add Group
            </motion.div>
          </section>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            whileDrag={{ scale: 1.1 }}
            className="bg-blue-600 text-white rounded-sm w-fit px-5 flex items-center relative left-36 mt-5 py-2 mb-3"
          >
            Submit
          </motion.button>
        </form>
        <div className="display-screen p-5 w-1/2 border-2 border-black">
          <h1 className="text-2xl font-bold text-center">Form Output</h1>
          {submitted ? (
            <>
              {storedFormData ? (
                <ul>
                  <li>
                    <h1 className="font-bold text-xl p-2">
                      {storedFormData.title}{" "}
                    </h1>
                  </li>
                  {storedFormData.abPairs.map((pair, index) => (
                    <li key={index} className="font-semibold">
                      {pair.a && (
                        <>
                          AB Pair {index + 1}: {pair.a} {pair.b}
                        </>
                      )}
                    </li>
                  ))}
                  {storedFormData.groups.map((group, index) => (
                    <li key={index} className="font-semibold">
                      {group.g && (
                        <>
                          Group {index + 1}: {group.g}
                        </>
                      )}
                      <ul>
                        {group.cvPairs.map((pair, index) => (
                          <li key={index} className="font-semibold">
                            {pair.c && pair.v && (
                              <>
                                CVV {index + 1}: {pair.v}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No stored form data found.</p>
              )}
            </>
          ) : (
            "No Items Submitted Yet"
          )}
        </div>
      </motion.div>
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
