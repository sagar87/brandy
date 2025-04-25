import React from "react";
interface ResultsProps {
  prompt: string;
  snippet: string;
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props: ResultsProps) => {
  const keywordElements = props.keywords.map((keyword) => (
    <div
      className="bg-teal-700 p-1 text-teal-000 px-2 text-sm rounded-md"
      key={keyword}
    >
      {keyword}
    </div>
  ));

  const keywordsContainer = (
    <div className="flex flex-wrap gap-2">{keywordElements}</div>
  );

  const resultSection = (label: string, body: any) => {
    return (
      <>
        <div className="bg-slate-700 p-4 mb-5 rounded-md text-sm">
          <div className="test-slate-500 font-bold mb-1">{label}</div>
          <div>{body}</div>
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        {resultSection("Prompt", props.prompt)}
        {resultSection("Snippet", props.snippet)}
        {resultSection("Keyword", keywordsContainer)}
        <button
          className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-40 w-full rounded-md py-2 text-lg"
          onClick={props.onBack}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Results;
