import React, { Component } from "react";
import Quote from "./Quote";
import Footer from "./Footer";

class QuoteSearcher extends Component {
    state = {
        quotes: [],
        fetching: true,
        liked: 0,
        disliked: 0,
        searchTag: "welcome"
    };

    componentDidMount = () => {
        this.search();
    };

    search = () => {
        this.setState({ fetching: true, quotes: [] });
        const url = `https://quote-garden.herokuapp.com/quotes/search/${this.state.searchTag}`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                const quotes = this.eliminatingDuplicates(response.results);
                this.setState({
                    quotes: quotes.map(element => {
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

    eliminatingDuplicates = data => {
        console.log(data);
        const newArr = [];
        const newArrQuotes = [];
        data.forEach(quote => {
            if (newArrQuotes.indexOf(quote.quoteText) === -1) {
                newArr.push(quote);
                newArrQuotes.push(quote.quoteText);
            }
        });
        console.log(newArr);
        return newArr;
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
        const quoteToUpdate = this.state.quotes.filter(
            quote => quote._id === id
        );
        // Go back to neutral state if liking or disliking twice
        if (quoteToUpdate[0].likedStatus === action) {
            quoteToUpdate[0].likedStatus = "neutral";
        } else {
            quoteToUpdate[0].likedStatus = action;
        }
        console.log(quoteToUpdate);
        this.setState(Object.assign({}, this.state.quotes, quoteToUpdate));
        this.likesAndDislikesCounter();
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
                <h1>Quotes. Here are some things people once said.</h1>
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
                    <input id="searchBtn" type="submit" value="Search !" />
                </form>
                <h3>
                    Liked: {this.state.liked} Disliked: {this.state.disliked}
                </h3>
                {/* Displaying loading message while fetching */}
                {this.state.fetching && (
                    <h3>
                        <em>Loading...</em>
                    </h3>
                )}
                {/* Displaying error if no quote found */}
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
                <Footer></Footer>
            </div>
        );
    }
}

export default QuoteSearcher;
