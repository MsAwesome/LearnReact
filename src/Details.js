import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./errorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

class Details extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: true
  //   }
  // }

  //Can only do this if you have control of the babel config
  state = {
    loading: true,
    showModal: false,
    hasError: false,
  };
  componentDidMount() {
    // throw new Error("error");
    pet.animal(this.props.id).then(({ animal }) => {
      debugger;
      if (typeof animal === "undefined") {
        this.setState({
          hasError: true,
        });
      } else {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `
                  ${animal.contact.address.city},
                  ${animal.contact.address.state},
              `,
          description: animal.description,
          media: animal.photos,
          breed: animal.breed,
          color: animal.colors.primary,
          loading: false,
          url: animal.url,
        });
      }
    });
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      throw new Error("error");
    }
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>loading.....</h1>;
    }

    const { animal, description, name, media, showModal } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div className="stuff">
          <h1>{name}</h1>
          <h2>{`${animal} - - ${name}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ background: theme }} onClick={this.toggleModal}>
                Adopt {name}!
              </button>
            )}
          </ThemeContext.Consumer>

          <p> {description} </p>
          {showModal ? (
            <Modal>
              <h1>Are you sure you want to adopt {name}?</h1>
              <div className="btns">
                <button onClick={this.adopt}>Yes!</button>
                <button onClick={this.toggleModal}>No =(</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
