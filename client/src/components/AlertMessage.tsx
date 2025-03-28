import { use } from "react";

interface AlertMessageProps {
  message: string;
  isSuccess: boolean;
  isVisible: boolean;
  onClose: () => void;
}
const AlertMessage = ({
  message,
  isSuccess,
  isVisible,
  onClose,
}: AlertMessageProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount or when isVisible changes
    }
  }, [isVisible, onClose]);
};

return (
  <div className="alert alert-success" role="alert">
    A simple success alert—check it out!
  </div>
);

export default AlertMessage;
