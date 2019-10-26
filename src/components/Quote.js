import React, { Component } from "react";
import { identifier } from "@babel/types";

class Quote extends Component {
    // state = {
    //     isLiked: false,
    //     isDisliked: false
    // };
    // like = () => {
    //     this.setState({ isLiked: true, isDisliked: false });
    //     console.log("I was liked!");
    // };
    // dislike = () => {
    //     this.setState({ isLiked: false, isDisliked: true });
    //     console.log("I was disliked!");
    // };

    render() {
        return (
            <div className="quoteContainer">
                <p
                    className={
                        this.props.likedStatus === "liked"
                            ? "liked"
                            : this.props.likedStatus === "disliked"
                            ? "disliked"
                            : null
                    }
                >
                    {this.props.quote}
                </p>
                <p>Author: {this.props.author}</p>
                <button
                    onClick={() => this.props.onClick(this.props.id, "liked")}
                >
                    ⇑
                </button>
                <button
                    onClick={() =>
                        this.props.onClick(this.props.id, "disliked")
                    }
                >
                    ⇓
                </button>
            </div>
        );
    }
}

export default Quote;
