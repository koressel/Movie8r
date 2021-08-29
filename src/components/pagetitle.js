import React from "react";


class PageTitle extends React.Component {
  constructor(props) {
    super(props);

    
  }

  render() {
    return (
      <div id="page-title" className={this.props.bgColor}>
          <h1>{this.props.title}</h1>
      </div>
    )
  }
}

export default PageTitle;