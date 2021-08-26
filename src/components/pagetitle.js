import React from "react";


class PageTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        bgColor: "blue"
    };

  }

  static getDerivedStateFromProps(props, state) {
    let colors = ["blue", "green", "orange", "purple"];

    for (let i = 0; i < colors.length; i++) {
        if(colors[i] == state.bgColor) {
            return colors[i + 1];
        }
    }
  }

  componentDidUpdate() {
    const target = document.querySelector('#page-title');
    target.style.background = this.state.bgColor;
  }


  render() {
    return (
      <div id="page-title" className="page-title-container" >
          <h1>{this.props.title}</h1>
          <p>{this.state.bgColor}</p>
      </div>
    )
  }
}

export default PageTitle;