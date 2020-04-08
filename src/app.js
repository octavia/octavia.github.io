import React, { Component } from 'react';
import { mat4 } from 'gl-matrix';
import Space3D from './space3d/space3D';
import Skybox from './space3d/skybox';

import githubLogo from './images/github.svg';
import twitterLogo from './images/twitter.svg';
import twitchLogo from './images/twitch.svg';
import youtubeLogo from './images/youtube.svg';


class App extends Component {
  constructor(props) {
    super(props);

    this.fov = 60;
    this.fov = (this.fov / 360) * Math.PI * 2;
    this.pointStars = true;
    this.seed = (Math.random() * 1000000000000000000).toString(36);
    this.stars = true;
    this.sun = true;
    this.nebulae = true;
    this.resolution = 1024;
    this.animationSpeed = 0.015;
    this.unifiedTexture = true;
    this.renderCanvas = document.getElementById('render-canvas');
    this.renderCanvas.width = window.innerWidth;
    this.renderCanvas.height = window.innerHeight;
    this.tick = 0.0;

    this.renderSpace = this.renderSpace.bind(this);
  }

  componentDidMount() {
    let fetchShaders = async () => {
      let nebulaResponse = await fetch('glsl/nebula.glsl');
      let nebula = await nebulaResponse.text();

      let pointStarsResponse = await fetch('glsl/point-stars.glsl');
      let pointStars = await pointStarsResponse.text();

      let skyboxResponse = await fetch('glsl/skybox.glsl');
      let skybox = await skyboxResponse.text();

      let starResponse = await fetch('glsl/star.glsl');
      let star = await starResponse.text();

      let sunResponse = await fetch('glsl/sun.glsl');
      let sun = await sunResponse.text();

      this.skybox = new Skybox(skybox, this.renderCanvas);
      this.space = new Space3D(nebula, pointStars, star, sun, this.resolution);

      this.renderTextures();
      this.renderSpace();
    }

    fetchShaders();
  }

  hideUnified() {
    document.getElementById('texture-canvas').style.display = 'none';
  }

  hideSplit() {
    document.getElementById('texture-left').style.display = 'none';
    document.getElementById('texture-right').style.display = 'none';
    document.getElementById('texture-top').style.display = 'none';
    document.getElementById('texture-bottom').style.display = 'none';
    document.getElementById('texture-front').style.display = 'none';
    document.getElementById('texture-back').style.display = 'none';
  }

  renderTextures() {
    let drawIndividual = (source, targetId) => {
      let canvas = document.getElementById(targetId);
      canvas.width = canvas.height = this.resolution;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(source, 0, 0);
    }

    let textures = this.space.render({
      seed: this.seed,
      pointStars: this.pointStars,
      stars: this.stars,
      sun: this.sun,
      nebulae: this.nebulae,
      unifiedTexture: this.unifiedTexture,
      resolution: this.resolution,
    });
    this.skybox.setTextures(textures);

    let canvas = document.getElementById('texture-canvas');
    canvas.width = 4 * this.resolution;
    canvas.height = 3 * this.resolution;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(textures.left, this.resolution * 0, this.resolution * 1);
    ctx.drawImage(textures.right, this.resolution * 2, this.resolution * 1);
    ctx.drawImage(textures.front, this.resolution * 1, this.resolution * 1);
    ctx.drawImage(textures.back, this.resolution * 3, this.resolution * 1);
    ctx.drawImage(textures.top, this.resolution * 1, this.resolution * 0);
    ctx.drawImage(textures.bottom, this.resolution * 1, this.resolution * 2);

    drawIndividual(textures.left, 'texture-left');
    drawIndividual(textures.right, 'texture-right');
    drawIndividual(textures.front, 'texture-front');
    drawIndividual(textures.back, 'texture-back');
    drawIndividual(textures.top, 'texture-top');
    drawIndividual(textures.bottom, 'texture-bottom');
  }

  renderSpace() {
    this.hideUnified();
    this.hideSplit();

    this.tick += 0.0025 * this.animationSpeed;

    let view = mat4.create();
    let projection = mat4.create();

    this.renderCanvas.width = window.innerWidth;
    this.renderCanvas.height = window.innerHeight;

    mat4.lookAt(view, [0, 0, 0], [Math.cos(this.tick), Math.sin(this.tick * 0.555), Math.sin(this.tick)], [0, 1, 0]);

    mat4.perspective(projection, this.fov, this.renderCanvas.width / this.renderCanvas.height, 0.1, 8);

    this.skybox.render(view, projection);

    requestAnimationFrame(this.renderSpace)
  }

  render() {
    return (
      <div id="App">
        <div id="information">
          <p>SYRI</p>
          <div id="links">
            <a href="https://github.com/syri" target="_blank" rel="noopener noreferrer"><img src={githubLogo} alt="GitHub Link"></img></a>
            <a href="https://twitter.com/syriuwu" target="_blank" rel="noopener noreferrer"><img src={twitterLogo} alt="Twitter Link"></img></a>
            <a href="https://www.twitch.tv/syriuwu" target="_blank" rel="noopener noreferrer"><img src={twitchLogo} alt="Twitch Link"></img></a>
            <a href="https://www.youtube.com/channel/UCo5iJfS9rDGTNyZmSKKHy5w" target="_blank" rel="noopener noreferrer"><img src={youtubeLogo} alt="YouTube Link"></img></a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
