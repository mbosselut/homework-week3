import React, { Component } from "react";
import { identifier } from "@babel/types";

class Quote extends Component {
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
                <p>
                    <em>- {this.props.author}</em>
                </p>
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
