import { useRouter } from "next/navigation";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const router = useRouter();

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-2xl shadow-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <h2 className="text-3xl font-semibold mb-6 text-black text-center">
          Contact Us
        </h2>
        <div className="space-y-6">
          <button
            className="w-full px-6 py-3 text-lg font-medium text-white bg-black rounded-md hover:bg-gray-900 transition ease-in-out duration-200"
            onClick={() => router.push("mailto:admin@onyxium.org")}
          >
            Send Us An E-mail
          </button>
          <button
            className="w-full px-6 py-3 text-lg font-medium text-white bg-black rounded-md hover:bg-gray-900 transition ease-in-out duration-200"
            onClick={() => router.push("https://discord.gg/NMWYCpwUdp")}
          >
            Contact Via Discord
          </button>
        </div>
        <button
          className="mt-8 w-full px-6 py-3 text-lg font-medium bg-gray-200 text-black rounded-md hover:bg-gray-300 transition ease-in-out duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactModal;
