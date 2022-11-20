# studybuddy


## Development
```
cd frontend
npm install
npm run start
```


## Inspiration

> Barriers to education widen gaps of inequality. We wanted to create an app that anyone with an internet connection who wants to either teach or learn with others can utilize. 

## What it does

> Users can either learn or teach. For example, a 12th Grader wants help with calculus but can also teach 8th grade geometry. Interactive study rooms are presented based on the individual's learning/teaching goals, and the languages they speak. This way, one can get Linear Algebra help in English, or teach basic Geometry in Hindi, bridging gaps between populations. The interactive study rooms have a chat feature, as well as a whiteboard feature for drawing ideas out, and able to connect with voice through a zoom meeting generator. Students can study with students, and tutors can join. 


## How we built it

>We utilized the MERN (MongoDB, Express, React, Node) tech stack to develop Study Buddy. In particular, we used Mondgo's Realm Web SDK to bootstrap the application which allowed us to have user authentication and access to MQL (MongoDB query language) out of the box. Study Buddy also uses a websocket (socket.io) for the chat rooms to allow users to communicate bidirectionally in real-time.

## Challenges we ran into

>When developing this application our group faced many technical challenges. The biggest challenge was implementing a meaningful way users could communicate. The initial idea was creating an audio and video streaming feature within the chat rooms. Web RTC is a complicated technology to integrate into the web app so instead we designed a chat room with whiteboards and chat giving students full confidence to communicate their thoughts while avoiding the complicated technology of Web RTC.
## Accomplishments that we're proud of

## What we learned

>We learned quite a lot of technical skills from each other, it was awesome working together. Doing UX/UI design, utilizing React's functionalities, and learning how to work with a team of varying backgrounds has overall increased our knowledge in utilizing technical skills for a meaningful cause.

## What's next for StuddyBuddy
>Adding In-App voice/video utilizing WebRTC. 
>Points/Karma System earned by participation. 
>Self-Evaluation tools and quizzes based on subject.
>Forming custom study groups.
