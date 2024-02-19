import Cookies from "js-cookie";
export const getToken = (type: string) => {
  return Cookies.get(type);
};
export const removeToken = (type: string) => {
  Cookies.set(type, "");
};
export const setToken = (type: string, val: string) => {
  Cookies.set(type, val);
};

export const MessageComponant = ({ message }) => {
  return (
    <div
      className="p-2 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
      role="alert"
    >
      <span className="font-medium"></span> {message}
    </div>
  );
};
