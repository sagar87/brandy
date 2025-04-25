import os


from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate


from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from typing import List

llm = ChatOpenAI(
    temperature=0.0,
    model=os.getenv("OPENAI_MODEL", "EMPTY"),
    api_key=os.getenv("OPENAI_API_KEY", "EMPTY"),
)


def branding_prompt(business):
    system_prompt = (
        "You are a marketing genius and you are very talented in selling goods."
    )
    human_prompt = "Generate upbeat branding snippet for {data}."

    return ChatPromptTemplate.from_messages(
        [
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template(human_prompt),
        ]
    ).invoke({"data": business})


def generate_branding_snippet(data):
    prompt = branding_prompt(data)
    return llm.invoke(prompt)


class BusinessKeywords(BaseModel):
    business: str = Field(description="the type of business")
    hashtags: List[str] = Field(description="list of cool hashtags")


BusinessKeywordsParser = PydanticOutputParser(pydantic_object=BusinessKeywords)


def keyword_prompt():

    return PromptTemplate(
        template="You are a marketing genius and you are very talented in selling goods.\n Generate cool hashtags for the {data} business.\n{format_instructions}",
        input_variables=["data"],
        partial_variables={
            "format_instructions": BusinessKeywordsParser.get_format_instructions()
        },
    )


def generate_brand_keywords(business):
    prompt = keyword_prompt()
    chain = prompt | llm | BusinessKeywordsParser
    return chain.invoke({"data": business})
