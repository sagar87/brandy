import React from "react";

interface FormPromps {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  charLimit: number;
}

const Form: React.FC<FormPromps> = (props: FormPromps) => {
  const isPromptValid = props.prompt.length <= props.charLimit;

  const updatePromptValue = (text: string) => {
    if (text.length <= props.charLimit) {
      props.setPrompt(text);
    }
  };

  let statusColor = "text-slate-500";
  let statusText = null;
  if (!isPromptValid) {
    statusColor = "text-red-500";
    statusText = `Input muss be less than ${props.charLimit} characters.`;
  }

  return (
    <div>
      <div className="mb-1 text-slate-400">
        <p className="mb-2">Tell me what your brand is about!</p>
        <input
          type="text"
          className="p-2 w-full rounded-md bg-gray-700 focus:outline-teal-900"
          placeholder="coffee"
          value={props.prompt}
          onChange={(e) => updatePromptValue(e.currentTarget.value)}
        ></input>
      </div>
      <div className={statusColor + " flex justify-between mb-4 text-sm"}>
        <div>{statusText}</div>
        <div>
          {props.prompt.length}/{props.charLimit}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-40 w-full rounded-md py-2 text-lg"
        onClick={props.onSubmit}
        disabled={!isPromptValid || props.isLoading || props.prompt.length == 0}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
