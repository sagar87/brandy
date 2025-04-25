"use client";
import React from "react";
import Form from "./form";
import Results from "./results";

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

  return (
    <>
      <h1>Brandy</h1>
      {displayedElement}
    </>
  );
};

export default Brandy;
