import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { LuMic, LuPaperclip, LuSend, LuX } from "react-icons/lu";

interface ChatInputFormProps {
  input: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({
  input,
  handleInputChange,
  handleFormSubmit,
}) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default form submission behavior
      if (input.trim() !== "") {
        // Trigger the form submission only if there is some input
        handleFormSubmit(event as any);
        setAttachments([]);
      }
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormSubmit(event);
    setAttachments([]);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-2 sm:p-4 fixed bottom-0 left-0 right-0 flex flex-col w-full max-w-screen-lg mx-auto"
    >
      <div className="flex items-center justify-center border border-gray-300 rounded-full shadow-md overflow-hidden bg-white">
        <input
          className="flex-grow p-2 sm:p-3 focus:outline-none text-gray-700 text-sm sm:text-base"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Handle key press for "Enter"
        />
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <LuPaperclip className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          />
          <button
            type="button"
            onClick={handleVoiceRecording}
            className={`p-2 transition-colors duration-200 ${
              isRecording
                ? "text-red-500 hover:text-red-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <LuMic className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="submit"
            className="px-3 py-1 sm:px-4 sm:py-2 m-1 sm:m-[6px] bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          >
            <LuSend className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs sm:text-sm"
            >
              <span className="text-gray-600 truncate max-w-[80px] sm:max-w-[100px]">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                className="ml-1 sm:ml-2 text-gray-500 hover:text-gray-700"
              >
                <LuX className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default ChatInputForm;
