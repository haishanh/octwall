## Octwall

> svg icons pattern picture generation made easy.

Checkout the [demo](http://octwall.hanhaishan.com)

Octwall help genrate picture like below from a bunch of svg icons or svg sprites.

<p align="center">
  <img src="https://raw.githubusercontent.com/haishanh/octwall/master/example.png" alt="octwall example">
</p>

From the online demo, you will only see github [octicons][octicons] icons. Google material design icons are also avaliable in the repo, but you need to run octwall yourself in your local environment, see below.

And also octwall supports some more color patterns.

<p align="center">
  <img src="http://7fva40.com1.z0.glb.clouddn.com/octwall-all.png" alt="octwall colors">
</p>

[octicons]: https://octicons.github.com/

Octwall is built with nodejs.

## Run it in your local environment

1/ Clone the repo

```
git clone https://github.com/haishanh/octwall.git
```

2/ Install dependency

```
cd octwall
npm install -g gulp
npm install
```

3/ Modify the file `octwall.config.js` as your want.

Basicly, the file will being imported as a object. Explanation for each key is also avaliable in the file itself.

## License

`octicons` used in this project come from GitHub's original [octicons repo][oct-repo]. License [here][oct-license].
`Google material design icons` used in this project come from Google's original [google/material-design-icons][material-repo] repo. License [here][material-license].

Others are my own work, use it whatever you want.

[oct-repo]: https://github.com/github/octicons/
[oct-license]: https://github.com/github/octicons/blob/master/LICENSE.txt
[material-repo]: https://github.com/google/material-design-icons
[material-license]: https://github.com/google/material-design-icons/blob/master/LICENSE