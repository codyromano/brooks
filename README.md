# Letters from David Brooks

A Christmas present for my mom, who's a big fan of David Brooks. It's a simple web app that features a collection of Brooks' columns.

## Get started

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

TODO: Add details for deploying prod app

