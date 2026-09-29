import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-slate-500 dark:text-slate-400">
      <Loader2 className="h-9 w-9 animate-spin text-blue-600 dark:text-blue-500 mb-3" />
      <p className="text-sm font-medium tracking-wide">{message}</p>
    </div>
  );
};

export default Loading;
