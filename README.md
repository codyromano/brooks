# Letters from David Brooks

![](https://i.imgur.com/iQqZYyQ.gif)

## Get started

First, set up [brooks-server](https://github.com/codyromano/brooks-server). That package provides a REST API that serves article data. This package only contains Webpack assets. It fetches data from the brooks-server.

After you set up [brooks-server](https://github.com/codyromano/brooks-server), clone this repo and install dependencies:

```
git clone https://github.com/codyromano/brooks.git
cd brooks
npm install
```

### Development

```
sudo chown $USER /usr/local/bin/
npm install -g webpack webpack-dev-server
webpack-dev-server --watch --progress --colors
```
In a separate terminal window, run:
```
webpack --watch
```
Open `http://localhost:9000`

### Production

I deployed a "One-click Node" droplet using Digital Ocean. The droplet uses Ubuntu, but the following instructions should apply to most other operation systems, too.

Assuming you already have `npm`, install a few additional CLIs:
```
npm install -g forever http-server webpack
```
Create a production-optimized Webpack bundle:
```
webpack -p
```
Permanently run a web server that serves static conent from the Webpack public folder:
```
screen
/usr/bin/forever start /usr/bin/http-server /root/brooks/public/ -p 80
```
