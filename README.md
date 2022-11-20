# StuddyBuddy
StuddyBuddy is an interactive tutoring app designed to help people of various backgrounds learn together. The app pairs users based on their learning goals, and then provides a forum for them to work together and learn from each other.

## Inspiration

> Barriers to education widen gaps of inequality. We wanted to create an app that anyone with an internet connection who wants to either teach or learn with others can utilize. 

## What it does

> Users can either learn or teach. For example, a 12th Grader wants help with calculus but can also teach 8th grade geometry. Interactive study rooms are presented based on the individual's learning/teaching goals, and the languages they speak. This way, one can get Linear Algebra help in English, or teach basic Geometry in Hindi, bridging gaps between populations. The interactive study rooms have a chat feature, as well as a whiteboard feature for drawing ideas out, and able to connect with voice through a zoom meeting generator. Students can study with students, and tutors can join. 


## How we built it

>We utilized the MERN (MongoDB, Express, React, Node) tech stack to develop Study Buddy. In particular, we used Mondgo's Realm Web SDK to bootstrap the application which allowed us to have user authentication and access to MQL (MongoDB query language) out of the box. Study Buddy also uses a websocket (socket.io) for the chat rooms to allow users to communicate bidirectionally in real-time.

## Challenges we ran into

>When developing this application our group faced many technical challenges. The biggest challenge was implementing a meaningful way users could communicate. The initial idea was creating an audio and video streaming feature within the chat rooms. Web RTC is a complicated technology to integrate into the web app so instead we designed a chat room with whiteboards and chat giving students full confidence to communicate their thoughts while avoiding the complicated technology of Web RTC.
## Accomplishments that we're proud of
>The biggest accomplishment we are proud of bridging educational gaps in society. We are also proud of creating a React web application leveraging several web technologies in a team with little to no experience with web development.

## What we learned

>We learned quite a lot of technical skills from each other, it was awesome working together. Doing UX/UI design, utilizing React's functionalities, and learning how to work with a team of varying backgrounds has overall increased our knowledge in utilizing technical skills for a meaningful cause.

## What's next for StuddyBuddy
>Adding In-App voice/video utilizing WebRTC. 
>Points/Karma System earned by participation. 
>Self-Evaluation tools and quizzes based on subject.
>Forming custom study groups.

https://user-images.githubusercontent.com/47361247/202920301-02de8dbf-9796-4324-aac9-52dafce6f717.mp4

<div align="center">
  <img src="https://user-images.githubusercontent.com/47361247/202920347-55899f57-d2aa-4e51-9bd5-ec2e98c56c2c.png" width="75%"/>
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/47361247/202920370-8f7f2150-2f2b-49d0-b3ae-7b2331bb0828.png" width="75%"/>
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/47361247/202920376-21d6c201-172e-4fad-8f45-7cc6275f41d7.png" width="75%"/>
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/47361247/202920383-4727529c-2f25-4d10-a42c-ee78bedc0306.png" width="75%"/>
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/47361247/202920392-4976df9b-cb7d-4cc6-8d29-8fece15ad1dc.png" width="75%"/>
</div>


## Development
```
cd frontend
npm install
npm run start
```

## Production
```
cd frontend & npm run build
```
```
cd backend & npm install
node index.js
```
