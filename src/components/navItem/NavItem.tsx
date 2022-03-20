import React from "react";
import navItemStyles from './navItem.module.css'

class NavItem extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }
    render() {
        return (
            <a className={`${navItemStyles.navItem} mb-4 mt-4 mr-2 p-5`}>
                {this.props.children}
                <p className="text text_type_main-default ml-2">{this.props.text}</p>
            </a>
        );
    }
}

export default NavItem;