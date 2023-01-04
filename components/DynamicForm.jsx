import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./DynamicForm.module.css";
import { useEffect } from "react";
// import framer motion
import { motion, AnimatePresence, delay } from "framer-motion";

function DynamicForm() {
  const modalRef = useRef();
  // hooks

  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState([{ a: "", b: "" }]);
  const [values, setValues] = useState([]);
  const [groups, setGroups] = useState([
    { title: "", captions: [{ c: "", v: "" }] },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const [title, setTitle] = useState("");

  const titleHandle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddInput = () => {
    const newInputs = [...inputs, { a: "", b: "" }];
    setInputs(newInputs);
  };

  const handleAddCaption = (groupIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].captions.push({ c: "", v: "" });
    setGroups(newGroups);
  };

  const handleAddGroup = () => {
    const newGroups = [...groups, { title: "", captions: [{ c: "", v: "" }] }];
    setGroups(newGroups);
  };

  const handleChange = (e, index, field) => {
    const newInputs = [...inputs];
    newInputs[index][field] = e.target.value;
    setInputs(newInputs);
  };

  const handleChangeGroup = (e, groupIndex, captionIndex = null, field) => {
    const newGroups = [...groups];
    if (captionIndex !== null) {
      newGroups[groupIndex].captions[captionIndex][field] = e.target.value;
    } else {
      newGroups[groupIndex][field] = e.target.value;
    }
    setGroups(newGroups);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setValues(inputs.map((input) => ({ a: input.a, b: input.b })));
    setGroups(
      groups.map((group) => ({
        title: group.title,
        captions: group.captions.map((caption) => ({
          c: caption.c,
          v: caption.v,
        })),
      }))
    );
  };

  const handleDeleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleDeleteGroup = (groupIndex) => {
    const newGroups = [...groups];
    newGroups.splice(groupIndex, 1);
    setGroups(newGroups);
  };
  // loading animation

  if (loading) {
    return (
      <>
        {/* spinner animaation using framer motion */}
        <motion.div
          className="flex justify-center items-center h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ease:"easeIn", duration: 4 }
        }
        >
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              {/* add fontawesome spinner icon */}
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
        className="sm:flex border-2 border-gray-300 container m-auto mt-2 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-wrapper sm:w-1/2">
          {/* A&B */}
          <section className="bg-gray-200 p-5 flex justify-center">
            <input
              type="text"
              placeholder="example: Eye Clinic"
              onChange={titleHandle}
              value={title}
              className="w-2/3 rounded-md border-2 border-gray-300 p-2 h-9 ml-8
              "
            />
          </section>
          <h2 className="font-bold ml-36 py-2">A&B</h2>
          <section className="bg-gray-200 p-5">
            {inputs.map((input, index) => (
              <div key={index} className="flex gap-5 justify-center">
                <input
                  placeholder={`A${index + 1}`}
                  value={input.a}
                  onChange={(e) => handleChange(e, index, "a")}
                  className="p-2 border-2 border-gray-300 rounded-md mb-3 w-1/4"
                />
                <input
                  placeholder={`B${index + 1}`}
                  value={input.b}
                  onChange={(e) => handleChange(e, index, "b")}
                  className="p-2 border-2 border-gray-300 rounded-md mb-3 w-1/4"
                />
                <motion.button
                  type="button"
                  onClick={() => handleDeleteInput(index)}
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileDrag={{ scale: 1.1 }}
              onClick={handleAddInput}
              className="bg-blue-600 text-white rounded-sm w-fit px-3 flex items-center relative top-2 left-[80%]"
            >
              Add A&B
            </motion.button>
          </section>
          {/* groups */}
          <h2 className="font-bold ml-36 py-2">Groups</h2>
          <section className="bg-gray-200 p-5">
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white w-full">
                <div className="flex justify-center bg-gray-200">
                  <input
                    placeholder={`G${groupIndex + 1}`}
                    value={group.title}
                    onChange={(e) =>
                      handleChangeGroup(e, groupIndex, null, "title")
                    }
                    className="w-[65%] rounded-md border-2 border-gray-300 p-2 h-9 ml-8 mb-3 "
                  />
                </div>
                <h1 className="font-bold mb-3 ml-28">Captions</h1>
                {group.captions.map((caption, captionIndex) => (
                  <div key={captionIndex} className="flex gap-5 justify-center">
                    <input
                      placeholder={`C${captionIndex + 1}`}
                      value={caption.c}
                      onChange={(e) =>
                        handleChangeGroup(e, groupIndex, captionIndex, "c")
                      }
                      className="p-2 rounded-md mb-3 w-1/4 bg-gray-200"
                    />
                    <input
                      placeholder={`V${captionIndex + 1}`}
                      value={caption.v}
                      onChange={(e) =>
                        handleChangeGroup(e, groupIndex, captionIndex, "v")
                      }
                      className="p-2 rounded-md mb-3 w-1/4 bg-gray-200"
                    />
                  </div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileDrag={{ scale: 1.1 }}
                  onClick={() => handleAddCaption(groupIndex)}
                  className="bg-blue-600 text-white rounded-sm w-fit px-3 flex items-center relative top-2 left-[80%] mb-5"
                >
                  Add C&V
                </motion.button>

                <motion.button
                  onClick={() => handleDeleteGroup(groupIndex)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileDrag={{ scale: 1.1 }}
                  className="bg-red-600 text-white rounded-sm w-fit px-3 flex items-center relative mb-2"
                >
                  Delete Group
                </motion.button>
              </div>
            ))}
            <motion.button
              onClick={handleAddGroup}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              whileDrag={{ scale: 1.1 }}
              className="bg-blue-600 text-white rounded-sm w-fit px-3 flex items-center relative left-36"
            >
              Add Group
            </motion.button>
            {/* submission and displaying */}
          </section>
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            whileDrag={{ scale: 1.1 }}
            className="bg-blue-600 text-white rounded-sm w-fit px-5 flex items-center relative left-36 mt-5 py-2 mb-3"
          >
            Submit
          </motion.button>
        </div>
        <div className="display-screen p-5 w-1/2 border-2 border-black">
          <h1 className="text-2xl font-bold text-center">Form Output</h1>
          {submitted ? (
            <div>
              <h1 className="font-bold text-xl p-2">{title}</h1>

              {values.length > 0 ? (
                values.map((value, index) => (
                  <div key={index} className="border-2 border-blue-600 p-2">
                    <h1>{`A${index + 1}: ${value.a}`}</h1>
                    <h1>{`B${index + 1}: ${value.b}`}</h1>
                  </div>
                ))
              ) : (
                <h1>No values are submitted!</h1>
              )}

              {groups.length > 0 ? (
                groups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h1 className="font-bold mb-2 mt-2">{`G${groupIndex + 1}: ${
                      group.title
                    }`}</h1>

                    {group.captions.map((caption, captionIndex) => (
                      <div
                        key={captionIndex}
                        className="border-2 border-blue-600 p-2"
                      >
                        <h1>{`C${captionIndex + 1}: ${caption.c}`}</h1>
                        <h1>{`V${captionIndex + 1}: ${caption.v}`}</h1>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <h1>No groups are submitted!</h1>
              )}
            </div>
          ) : (
            <h1>No values submitted yet</h1>
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
