FROM public.ecr.aws/lambda/python:3.11

# Copy requirements.txt
COPY ./requirements.txt ${LAMBDA_TASK_ROOT}

# Install dependencies
RUN pip install -r ${LAMBDA_TASK_ROOT}/requirements.txt 

# Copy source code
COPY ./api/ ${LAMBDA_TASK_ROOT}/api/

# !!! Adding code to python path
ENV PYTHONPATH="$PYTHONPATH:${LAMBDA_TASK_ROOT}"

# Set woring directory
WORKDIR ${LAMBDA_TASK_ROOT}/api

# Run the app
CMD ["main.handler"]