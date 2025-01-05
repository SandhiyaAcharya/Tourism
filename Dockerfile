# Use an official Python image from DockerHub
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements and install them
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Define the command to run the app
CMD ["flask", "--app", "app.py", "run", "--host=0.0.0.0", "--port=5000"]

