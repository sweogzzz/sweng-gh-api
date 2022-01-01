# Metric Visualization

Scroll down for screenshots/demo

Dependencies:
- `charts.js` and `react` for ui
- `@octokit/rest` to query GitHub API

## Setup

Required: nodejs/npm and api token.

### Authentication

1. Create a blank file `.env` in the root.
2. Write inside `REACT_APP_SECRET=yourtokenhere`
3. Sign in, go to settings\\developer settings.
4. Generate a Personal Access Token specifically.
5. Copy the token and paste it into the file.

### Startup (Without Docker)

If docker is preferred, go to the next section.

```
$ npm install
$ npm start
```

### Startup (Using Docker)

#### Options
- Docker
- Compose
- Scripts

#### Manual instructions:
1. Open a terminal in `./src`
2. Run `docker build -t sample .`
3. Open the container

Example in a bash terminal:

```
$ docker build -t sample .
$ docker run \
> -it \
> --rm \
> -p 3000:3000 \
> -e CHOKIDAR_USEPOLLING=true \
> sample
```

#### Compose instructions:
1. `docker-compose up`
2. `CTRL+C` to exit

```
$ docker-compose up
```

#### Scripts instructions:
1. `quickstart.bat` for easy startup
    - Open in file explorer on Windows
    - `quickstart.bat` in cmd
2. `quickstart.sh` for easy startup
    - Open in file explorer on Windows
    - `./quickstart.sh` in bash terminal
    - `./quickstart.sh` in powershell
3. `CTRL+C` to exit

#### Viewing

The app is viewable at `http://localhost:3000`

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

![screen14.png](./screenshots/screen14.png)

### Screenshots 15-20

Added new features:
1. Time interval input
2. User account input
3. Commits for interval
4. Issues chart
5. A/D chart

![screen16.png](./screenshots/screen16.png)\
![screen15.png](./screenshots/screen15.png)\
![screen17.png](./screenshots/screen17.png)\
![screen18.png](./screenshots/screen18.png)\
![screen19.png](./screenshots/screen19.png)\
![screen20.png](./screenshots/screen20.png)