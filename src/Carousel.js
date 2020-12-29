import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };

  //if you dont do the setting of state like ^ then you would need the following

  // constructor(props) {
  //   super(props); //super is always called in constructor method
  //   this.handleIndexClick = this.handleIndexClick.bind(this); // bind the correct context to the keyword this. This statement will bind the Carousel to the context
  // }

  static getDerivedStateFromProps({ media }) {
    debugger;
    let photos = ["http://placecorgi.com/300/300"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  //using the arrow function does not create new context so the keyword this is still the Carousel
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal-carousel-alt" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            //eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="small-animal"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
