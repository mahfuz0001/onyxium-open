"use client";

import ChatInputForm from "@/components/Chat/ChatInputForm";
import { useToast } from "@/components/ui/use-toast";
import { demoQuestions } from "@/constants";
import { modelData } from "@/data/modelData";
import { useProModal } from "@/libs/hooks/use-pro-modal";
import "@/styles/Sidebar.module.css";
import { createClient } from "@/utils/supabase/client";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { LuUserCircle2 } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PageProps {
  params: { info: string };
}


const supabase = createClient();

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <div className="relative">
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {value}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 bg-gray-700 text-white rounded"
      >
        Copy
      </button>
    </div>
  );
};

const ModelPage = ({ params }: PageProps) => {
  const { info } = params;
  const model = modelData
    .flatMap((category) => category.models)
    .find((model) => model.info === info);

  if (!model) {
    notFound();
  }

  const [, setApiData] = useState<any>(null);
  const [, setLoading] = useState<boolean>(true);

  const proModal = useProModal();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    if (model) {
      fetch(model.info)
        .then((res) => res.json())
        .then((data) => {
          setApiData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [model]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `${model.api}`,
  });

  const saveMessageToDatabase = async (message: string, role: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message, role, created_at: new Date() }]);

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error("Error saving message:", error.message);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      return null;
    } finally {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsTyping(true); // Set typing state to true
      await handleSubmit(event);
      await saveMessageToDatabase(input, "user");
      const response = await fetch(`${model.api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (response.status === 429) {
        proModal.onOpen();
        toast({
          title: "API Limit Exceeded",
          variant: "destructive",
        });
      } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      } else {
        const botMessage = await response.json();
        const { content } = botMessage;
        await saveMessageToDatabase(content, "bot");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsTyping(false); // Set typing state to false
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-full mb-20">
        <div
          className="flex-grow overflow-y-auto w-[90%] h-[70vh] sm:w-[80%] md:w-[95%] md:mb-[60px] lg:w-[85%] xl:w-[85%] mx-auto xl:mb-[10vh]"
          ref={chatContainerRef}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Try asking one of these questions:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh]">
                {demoQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                    onClick={() =>
                      handleInputChange({
                        target: { value: question },
                      } as ChangeEvent<HTMLInputElement>)
                    }
                  >
                    <p className="text-sm text-gray-700">{question}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start mb-4 ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {message.role !== "user" && (
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-6 h-6 my-auto">
                        <Image
                          src={model.icon}
                          alt={model.title}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={`${message.role === "user" ? "ml-2" : "mr-2"
                      } flex-shrink-0`}
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      maxWidth: "80%",
                    }}
                  >
                    <div>
                      <div
                        className={`p-3 rounded-lg shadow ${message.role === "user"
                          ? "bg-purple-100"
                          : "bg-purple-300"
                          }`}
                      >
                        <ReactMarkdown
                          className="text-sm text-gray-700 break-words"
                          components={{
                            code({
                              inline,
                              className,
                              children,
                              ...props
                            }: {
                              inline?: boolean;
                              className?: string;
                              children?: React.ReactNode;
                              props?: any;
                            }) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              return !inline && match ? (
                                <CodeBlock
                                  language={match[1] || ""}
                                  value={String(children).replace(/\n$/, "")}
                                />
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 ml-2">
                        <LuUserCircle2 className="h-full w-full text-purple-500" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start mb-4 justify-start">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 my-auto">
                      <Image
                        src={model.icon}
                        alt={model.title}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mr-2 flex-shrink-0">
                    <div>
                      <div className="p-3 rounded-lg shadow bg-purple-300">
                        <span className="text-sm text-gray-700 break-words">
                          ....
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ChatInputForm
        input={input}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default ModelPage;
