# express-next-boilerplate

**How to run it**
1) Clone and cd into project
2) npm install
3) npm run dev --> which runs node server.js


**Noteable Changes**

1) No client folder as we are only doing server-side rendering
2) server.js is probably going to have to change a bit to use more of express-session and passport


**Why this is going to be better than normal react**
1) API calls seem to be a lot easier, but there are more weird things that I still don't quite understand... 
2) HTML routing is easier. Also can prevent user from being able to type in the URL by hand.

![image](https://user-images.githubusercontent.com/41297819/74060613-f6fb7300-49af-11ea-8edc-6dc0d026c27b.png)

-Snippet above shows that whenever "/about" it will render "/" or index.js. We could change "/about" --> "*" and that would take care of all urls entered

 
