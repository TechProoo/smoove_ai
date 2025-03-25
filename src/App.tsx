import { CirclePlus, Send } from "lucide-react";
import "./App.css";
import Image from "../src/Images/techPro.png";
import User from "../src/Images/user.png";
import { motion } from "framer-motion";
import Ai from "../src/Images/c6cd67f8-7d00-4af6-b4d4-88be5aefa857.webp";
import { generateResponse } from "./Api";
import { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import { getRandomQuestions } from "./questions";
import TemporaryDrawer from "./Components/Drawer";
import { Button } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [prompt, setPrompt] = useState("");
  const qlevel = "beginner";

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const randomQuestions = getRandomQuestions();

  const getAns = async (question: string, level: "beginner" | "advanced") => {
    try {
      setLoading(true);
      console.log(`Fetching response for ${level}...`);

      const refinedPrompt =
        level === qlevel
          ? `Explain this concept in simple terms for a beginner: ${question}. Include an easy-to-understand example.`
          : `Provide an in-depth technical explanation for an advanced learner: ${question}. Include multiple code examples.`;

      const response = await generateResponse(refinedPrompt);
      if (!response) {
        throw new Error("No response received.");
      }

      setLoading(false);
      return response;
    } catch (error) {
      console.error("Error fetching response:", error);
      setLoading(false);
    }
  };

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    setLoading(true);

    const response = await getAns(prompt, qlevel);
    if (response) {
      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    }

    setLoading(false);
    setPrompt("");
  };

  const sendQues = async (promptQues: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: promptQues }]);
    setLoading(true);

    const response = await getAns(promptQues, qlevel);
    if (response) {
      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    }

    setLoading(false);
  };

  // Auto-scroll when messages update
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1]) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  const newChat = () => {
    window.location.reload();
  };

  return (
    <div className="h-[100%] overflow-hidden w-[100%]">
      <div
        style={{ zIndex: "1" }}
        className="fixed left-0 top-0 w-[100%] flex items-center justify-between pr-2 bg-stone-200  md:hidden"
      >
        <TemporaryDrawer sendQues={sendQues} />
        <Button style={{ color: "#3C3D37" }} onClick={newChat}>
          <CirclePlus />
        </Button>
      </div>
      <div className="grid grid-cols-12">
        <div
          className="md:col-span-2 hidden md:block border-r h-[100vh]"
          style={{ backgroundColor: "#181C14" }}
        >
          <div className="left p-3">
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
                  <span className="text-[#697565] text-3xl font-bold">AI</span>
                </p>
              </div>

              <button onClick={newChat} className="new_chart my-5">
                New chat
              </button>
              <div className="random_pinned mt-10">
                <div className="my-2">
                  <small className="my-1">PINNED</small>
                </div>
                {randomQuestions.map((pro, index) => (
                  <motion.div
                    key={pro}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.3 }}
                    className="flex mt-3 random_pinned_btn items-center p-2 justify-between bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <button onClick={() => sendQues(pro)} className="text-sm">
                      {pro}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="left_history mt-11">
              <div className="history">
                <div className="my-2">
                  <small className="my-1 font-black">History</small>
                </div>
                <i className="text-gray-600">COMING SOON</i>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-10 rel col-span-12 h-[100vh]">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col relative mx-4 items-center justify-center h-full"
            >
              <p className="text-xl text-gray-400 font-semibold">
                🚀 Enter a programming issue to get started!
              </p>
              <p className="text-sm text-gray-500 mt-2">
                SmooveAI is here to assist you with coding challenges. Try
                asking something!
              </p>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex md:m-[17px] items-center bg-[#181C14] p-3 rounded-xl w-[100%]">
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Message to SmooveAI"
                    className="flex-1 bg-transparent text-[#ffdab3] placeholder-[#ffdab3] outline-none px-2"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-3 bg-[#ffdab3] p-2 rounded-full hover:bg-purple-500"
                    onClick={sendPrompt}
                  >
                    <Send size={20} className="text-[#181C14]" />
                  </motion.button>
                </div>
                <p className="text-xs text-center text-gray-600 mt-2">
                  SmooveAI helps you learn programming step by step—practice and
                  curiosity will make you even better!
                </p>
              </div>
            </motion.div>
          )}

          <div className="right">
            <div
              style={{ zIndex: "1" }}
              className="flex hidden md:flex items-center space-x-3 absolute top-0 right-0 px-5 rounded-lg shadow-lg"
            >
              <b className="text-white uppercase tracking-wider">Built By</b>
              <img
                src={Image}
                className="w-20 h-auto object-contain rounded-md shadow-sm"
                alt="Built By"
              />
            </div>
            <div className="md:h-[93vh] h-[100vh] mt-10 mb-20 md:w-[75%] message_cover m-auto md:p-8 p-3 relative">
              <div className="message_cover md:h-[400px] h-[78vh] overflow-y-auto">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex items-start gap-3 my-3 ${
                      msg.sender === "ai" ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Avatar Image */}
                    <img
                      src={msg.sender === "ai" ? Ai : User}
                      alt="Avatar"
                      width={30}
                      height={30}
                      className={`rounded-full ${
                        msg.sender === "ai" ? "hidden md:block" : ""
                      }`}
                    />

                    {/* Message Content */}
                    <article
                      className={`text-lg font-medium ans_text md:w-[75%] p-3 md:p-5 rounded-lg ${
                        msg.sender === "ai"
                          ? "bg-[#181C14] text-[#ffdab3] mss" // AI message colors
                          : "bg-[#ffdab3] text-[#181C14]" // User message colors
                      }`}
                      dangerouslySetInnerHTML={{ __html: marked(msg.text) }}
                    />
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-2 my-4"
                  >
                    <svg
                      className="animate-spin h-6 w-6 text-[#ffdab3]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <p className="text-[#ffdab3] text-lg font-medium">
                      Thinking...
                    </p>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4">
                <div className="flex md:m-[17px] items-center bg-[#181C14] p-3 rounded-xl w-[100%]">
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Message to SmooveAI"
                    className="flex-1 bg-transparent text-[#ffdab3] placeholder-[#ffdab3] outline-none px-2"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-3 bg-[#ffdab3] p-2 rounded-full hover:bg-purple-500"
                    onClick={sendPrompt}
                  >
                    <Send size={20} className="text-[#181C14]" />
                  </motion.button>
                </div>
                <p className="text-xs text-center text-gray-600 mt-2">
                  SmooveAI helps you learn programming step by step—practice and
                  curiosity will make you even better!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
