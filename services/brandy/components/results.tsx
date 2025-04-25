import React from "react";
interface ResultsProps {
  prompt: string;
  snippet: string;
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props: ResultsProps) => {
  const keywordElements = props.keywords.map((keyword) => (
    <div key={keyword}> {keyword}</div>
  ));
  return (
    <>
      <div>
        Here are your results bro:
        <div>
          <div>
            <b>Prompt:</b>
          </div>
          <div>{props.prompt}</div>
        </div>
        <div>
          <div>
            <b>Snippet:</b>
          </div>
          <div>{props.snippet}</div>
        </div>
        <div>
          <div>
            <b>Keywords:</b>
          </div>
          <div>{keywordElements}</div>
        </div>
      </div>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default Results;
