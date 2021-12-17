# Metric Visualization

Project goals:
- Fetch github data
- Visualize the data

Finished code:
1. Takes a query for a repo
2. Makes four api calls to github
    - Repo details
    - Repo commits details
    - Repo languages details
    - Repo contributions details
3. Plots four graphs
    - Radar chart using a rating system
    - Line chart of recent commits
    - Doughnut chart of contributions
    - Doughnut chart of languages
3. Can take more queries after

Special features include:
1. Auth with `axios`
2. Graphs with `chart.js`
    - Adjusting dates for timelines
    - Filtering of data
    - Animations

## Demo

### Screenshot 1

How the web app looks when started.

![screen1.png](screenshots/screen1.png)

### Screenshot 2

Chartsjs comes with interpolation.\
For nicer looking line graphs.

![screen2.png](screenshots/screen2.png)

### Screenshot 3

Some analysis I did on this repo.

![screen3.png](screenshots/screen3.png)

### Screenshot 4

Moving onto another repository...\
`lmammino/public-transport-ireland`\
Going in order up/down left/right:
1. lmammino's repo gets attention
    - radar emphasizes watching/starreds
    - also a fair size rating
2. lmammino took a week break
    - timeline shows a gap between commits
    - dates describe that gap well
3. lmammino had little help
    - could have not been collaborative
    - could be efficient on their own
4. lmammino is familiar with typescript
    - also making use of shell utilities
    - interesting takeaway about hobbies

![screen4.png](screenshots/screen4.png)

### Screenshot 5

Another repo `imdbpy`:
1. Lots of traffic, forks & commits
    - issue also show engagement
    - peaked watching rating
2. Curve of commits late August
    - potential development cycle
    - shows organization skills
3. Two users share most of traffic
    - pair programming perhaps
4. Distinct focus on python
    - makefile takes little space
    - makes sense it would

![screen5.png](screenshots/screen5.png)

### Screenshot 6

In the same repo from screen 5...\
View of a commit at 9pm
- Peer into work ethic
- Conversely, bad habits

![screen6.png](screenshots/screen6.png)

### Screenshot 7

The repository `microsoft/terminal`.\
Nice example of a good rating.
- Peak ratings besides size
- Size was made to have a steep curve
- Still, smaller code can be a good thing
- Left to the user to interpret the graphs

![screen7.png](screenshots/screen7.png)

### Screenshot 8

Another look at the statistics.

![screen8.png](screenshots/screen8.png)

### Screenshot 9

The repository `git/git`.\
Large codebase, good ratings.\
- Healthy distribution of users/langs.
- Commits come in spikes
- Helps avoid clutter

![screen9.png](screenshots/screen9.png)

### Screenshot 10

Clear view of the most active contributors.

![screen10.png](screenshots/screen10.png)

### Screenshot 11

Nice and slightly different repo.

![screen11.png](screenshots/screen11.png)

### Screenshot 12

Another repository, cool stats.

![screen12.png](screenshots/screen12.png)

### Screenshot 13

Repository with steady production.
- Consistent commits past two weeks.
- Use of a trio of core langs.

![screen13.png](./screenshots/screen13.png)

### Screenshot 14

Example of filtering data.\
Click entries in the legend.

## Setup

Required: nodejs/npm and api token.

### `./.env`

Authenticates.
1. Create this file in the root.
2. Define `REACT_APP_SECRET=yourtokenhere`
3. Sign in, go to settings\\developer settings.
4. Generate a Personal Access Token specifically.
5. Copy the token and paste it into the file.

### `npm start`

Starts the application.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
