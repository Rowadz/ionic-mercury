##### A Client for Mercury using Ionic (bodged without care)

- you can lunch this app on andoird or ios phone.

`To make this application work you need to install mercury laravel in your machine`

#### installation

### 1 - Install mercury laravel

[here](https://github.com/MohammedAl-Rowad/Mercury-web-Laravel-5.6)

### 2 - install ionic

```bash
$ npm install -g ionic
```

### 3 - install this repo

```bash
$ git clone https://github.com/MohammedAl-Rowad/ionic-mercury.git
$ cd ionic-mercury
$ npm i
```

- to run the app in the browser

```bash
$ ionic serve
```

#### to run the app in your phone

```bash
$ ionic serve -c
```

- you need to have [Ionic DevApp](https://play.google.com/store/apps/details?id=io.ionic.devapp&hl=en) on your phone
- install valet (to make the laravel application public)
  - for windows [here](https://github.com/cretueusebiu/valet-windows)
  - linux [here](https://github.com/laravel/valet)

```bash
$ cd mercury
$ valet share
```

- then copy the link, `it will look something like this http://3d7ed870.ngrok.io`
- add `api` to the end of the link then
- go to `src/environments/environment.ts` and past this link in

```ts
export const environment = {
  production: false,
  api: 'http://3bf8c5b2.ngrok.io/api' // past it here
};
```
