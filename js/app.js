class Application extends React.Component {
  render () {
    return(
    <div>
      <div className='information'>
        <p>OCTAVIA</p>
        <div className="links">
          <a href="https://twitter.com/octayyvia" target="_blank"><img src="images/twitter.svg"></img></a>
					<a href="https://www.twitch.tv/octayyvia" target="_blank"><img src="images/twitch.svg"></img></a>
					<a href="https://www.soundcloud.com/octayyvia" target="_blank"><img src="images/soundcloud.svg"></img></a>
					<a href="https://www.youtube.com/channel/UCo5iJfS9rDGTNyZmSKKHy5w" target="_blank"><img src="images/youtube.svg"></img></a>
        </div>
      </div>
      <div className="heart">
        <p>♡</p>
      </div>
      <div className="projectbutton">
        <button className="button">PROJECTS</button>
      </div>
    </div>)
  }
}

ReactDOM.render(<Application />, document.getElementById('application'))
