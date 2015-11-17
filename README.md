remoteSqueeze
=============
#### A remote of Logitech Media Server/Squeeze Server
6 actions are availables via 6 files entries.

### Installation Instructions
Clone the repository 
```
git clone https://github.com/Bonome/remoteSqueeze.git
```
Move to the repo 
```
cd remoteSqueeze
```
Install dependencies
```
npm install
```

### How does it works
Set server parameters in config/config.json.

Execute a command to run an action
```
node /path/to/remoteSqueeze/playPause.js
node /path/to/remoteSqueeze/next.js
node /path/to/remoteSqueeze/previous.js
node /path/to/remoteSqueeze/mute.js
node /path/to/remoteSqueeze/volUp.js
node /path/to/remoteSqueeze/volDown.js
```

Set shortcuts on your OS with these commands.