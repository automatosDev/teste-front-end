import React, {Component} from "react";
import ListContacts from "./ListContacts";
import {
    getUsersByPage,
    getStarted
} from "./api/ContactAPI";


class Pagination extends Component {
    constructor() {
        super();
        this.state = { actualPage: 1 , totalPages: null, cards: []}
    }

    componentDidMount() {
        getStarted().then(data => this.setState({cards:data.cards,totalPages:data.pages }));
    }

    getCards() {
        const {actualPage} = this.state;
        getUsersByPage(actualPage).then(data => this.setState({cards:data}));
    }

    setActualPage(e) {
        e.preventDefault();
        const {actualPage} = this.state;
        const newPage = e.currentTarget.dataset.id;
        if (newPage !== actualPage) {
            this.setState({actualPage:newPage}, () => {
                this.getCards();
            });            
        }
    }

    renderPagination() {
        const {totalPages,actualPage} = this.state;
        const pages = Array.from(new Array(totalPages).sort(), (val,index) => {return index+1});
        return (
            <ul className="pagination">
                {pages.map((val,index) => {
                    let liClassName = (index+1 == actualPage) ? "active" : "waves-effect";
                    return(
                        <li 
                            key={index} 
                            className={liClassName}
                            data-id={index+1}
                            onClick={this.setActualPage.bind(this)}>
                                <a href="#!">{index+1}</a>
                        </li>
                    )
                })}
            </ul>

        )
    }

    render() {
        const {actualPage,cards} = this.state;
        return (
            <div className="pages col s6">
                <ListContacts actualPage={actualPage} cards={cards} />
                <div className="pages">
                    {this.renderPagination()}
                </div>
            </div>
            
        )
    }
}

export default Pagination;