import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import Ai from "../Images/c6cd67f8-7d00-4af6-b4d4-88be5aefa857.webp";
import { ChartBarIncreasing } from "lucide-react";
import Image from "../Images/techPro.png";

interface SidebarProps {
  sendQues: (promptQues: string) => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ sendQues }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const randomQuestions = [
    "What is React?",
    "How do I use Tailwind CSS?",
    "Explain closures in JavaScript.",
  ];

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const newChat = () => {
    window.location.reload();
  };

  const postQuestion = (ques: string) => {
    sendQues(ques);
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => toggleDrawer(true)}
        sx={{
          minWidth: "unset",
          color: "#181C14",
          padding: "12px !important",
        }}
      >
        <ChartBarIncreasing />
      </Button>
      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <Box
            style={{ backgroundColor: "#181C14" }}
            className="left p-3 w-64 h-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="left_top">
                <div className="logo flex items-center gap-3">
                  <img
                    src={Ai}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full shadow-md border border-gray-300"
                  />
                  <p className="text-2xl font-semibold text-gray-800">
                    Smoove
                    <span className="text-[#697565] text-3xl font-bold">
                      AI
                    </span>
                  </p>
                </div>
                <button
                  onClick={newChat}
                  className="new_chat my-5 bg-gray-200 p-2 rounded-lg w-full"
                >
                  New Chat
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="random_pinned mt-10"
            >
              <div className="my-2">
                <small className="my-1 font-bold">PINNED</small>
              </div>
              {randomQuestions.map((question) => (
                <motion.div
                  key={question}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex mt-3 random_pinned_btn items-center p-2 justify-between bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                >
                  <button
                    onClick={() => postQuestion(question)}
                    className="text-sm"
                  >
                    {question}
                  </button>
                </motion.div>
              ))}
            </motion.div>

            <div className="left_history mt-11">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="history">
                  <div className="my-2">
                    <small className="my-1 font-black">History</small>
                  </div>
                  <i className="text-gray-600">COMING SOON</i>
                </div>
              </motion.div>
            </div>

            <div
              style={{ zIndex: "1" }}
              className="flex items-center bg-stone-200 space-x-3 absolute bottom-0 right-0 px-5 "
            >
              <b
                className="text-white uppercase tracking-wider"
                style={{ color: "#181C14" }}
              >
                Built By
              </b>
              <img
                src={Image}
                className="w-20 h-auto object-contain rounded-md shadow-sm"
                alt="Built By"
              />
            </div>
          </Box>
        </motion.div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
