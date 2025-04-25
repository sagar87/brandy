"use client";
import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
// import logo from "../public/brandy.png";
import logo from "../public/brandy_alt.png";

const Brandy: React.FC = () => {
  const SNIPPET: string =
    "https://cytyxlux6c.execute-api.eu-north-1.amazonaws.com/prod/generate_snippet";

  const KEYWORD: string =
    "https://cytyxlux6c.execute-api.eu-north-1.amazonaws.com/prod/generate_keywords";
  const charLimit = 32;
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    // console.log("submitting" + prompt);
    setIsLoading(true);
    fetch(`${SNIPPET}?data=${prompt}`)
      .then((res) => res.json())
      .then(onSnippetResult);
    fetch(`${KEYWORD}?data=${prompt}`)
      .then((res) => res.json())
      .then(onKeywordResult);
    setHasResult(true);
  };

  const onSnippetResult = (data: any) => {
    setSnippet(data.snippet);
  };

  const onKeywordResult = (data: any) => {
    setKeywords(data.keywords);
  };

  const onReset = (data: any) => {
    setPrompt("");
    setIsLoading(false);
    setHasResult(false);
  };

  let displayedElement = null;
  if (hasResult) {
    displayedElement = (
      <Results
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
      />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        charLimit={charLimit}
        isLoading={isLoading}
      />
    );
  }
  const gradientTextStyle =
    "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-gray-900 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <center>
              <Image src={logo} width={64} height={64} alt="logo" />
            </center>
            <h1
              className={gradientTextStyle + " text-3xl font-light w-fit my-1"}
            >
              Brandy
            </h1>
            <br />
            <div className={gradientTextStyle + " text-sm"}>
              Your favorite AI branding assistant.
            </div>
          </div>
          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default Brandy;
