"# node-reactjs" 
Development
Clone this repository:

git clone https://github.com/mrpatiwi/routed-react.git
cd routed-react
Install dependencies:

npm install
Start the project at http://localhost:3000.

npm start
Running with Docker
Be sure to install Docker and start a Docker-machine if necessary.

Let's create an image named routed-react:

docker build -t routed-react .
Finally, start a container named routed-react-instance at port 80.

docker run -p 80:9000 --name routed-react-instance routed-react
Testing
npm test