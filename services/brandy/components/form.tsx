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

  return (
    <>
      <p>Tell me what your brand is about!</p>
      <input
        type="text"
        placeholder="coffee"
        value={props.prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div>
        {props.prompt.length}/{props.charLimit}
      </div>
      <button
        onClick={props.onSubmit}
        disabled={!isPromptValid || props.isLoading || props.prompt.length == 0}
      >
        Submit
      </button>
    </>
  );
};

export default Form;
