import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
    state = {
        quotes: [],
        fetching: true,
        liked: 0,
        disliked: 0,
        searchTag: "tree"
    };

    componentDidMount = () => {
        this.search();
        // fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
        //     .then(response => response.json())
        //     .then(response => {
        //         this.setState({
        //             quotes: response.results.map(element => {
        //                 return {
        //                     ...element,
        //                     likedStatus: "neutral"
        //                 };
        //             }),
        //             isFetching: false
        //         });
        //         this.likesAndDislikesCounter();
        //     });
    };

    search = () => {
        this.setState({ fetching: true, quotes: [] });
        const url = `https://quote-garden.herokuapp.com/quotes/search/${this.state.searchTag}`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    quotes: response.results.map(element => {
                        return {
                            ...element,
                            likedStatus: "neutral"
                        };
                    }),
                    fetching: false
                });
                this.likesAndDislikesCounter();
            });
    };

    likesAndDislikesCounter = () => {
        const likesStatus = this.state.quotes.reduce(
            (counter, element) => {
                if (element.likedStatus === "liked") {
                    counter.liked++;
                } else if (element.likedStatus === "disliked") {
                    counter.disliked++;
                }
                return counter;
            },
            { liked: 0, disliked: 0 }
        );
        this.setState({
            liked: likesStatus.liked,
            disliked: likesStatus.disliked
        });
    };

    setLiked = (id, action) => {
        // console.log(id, action);
        const quoteToUpdate = this.state.quotes.filter(
            quote => quote._id === id
        );
        quoteToUpdate[0].likedStatus = action;
        console.log(quoteToUpdate);
        this.setState(Object.assign({}, this.state.quotes, quoteToUpdate));
        this.likesAndDislikesCounter();
        //Search for quote by id and update liked status
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.search();
    };

    render() {
        return (
            <div>
                <h1>Quotes. Here are quotes.</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search quotes :
                        <input
                            type="text"
                            name="searchTag"
                            value={this.state.searchTag}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Search !" />
                </form>
                <h3>
                    Likes: {this.state.liked} and Disliked:{" "}
                    {this.state.disliked}
                </h3>
                {this.state.fetching && <h3>Loading...</h3>}
                {this.state.quotes.length === 0 && !this.state.fetching && (
                    <h3>Sorry ! We did not find quotes for that search.</h3>
                )}
                {this.state.quotes.map(quote => {
                    return (
                        <div>
                            <Quote
                                quote={quote.quoteText}
                                author={quote.quoteAuthor}
                                id={quote._id}
                                likedStatus={quote.likedStatus}
                                onClick={(id, action) =>
                                    this.setLiked(id, action)
                                }
                            ></Quote>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default QuoteSearcher;
