import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { MenuItem } from './MenuItem';
import { keyFromObject } from '../../../util/keyGenerator';
import { prefix } from '../../../util/prefix';
import { CLASS_NAMES } from '../../../constants/GridConstants';

const { array, number, object, string } = PropTypes;

class Menu extends Component {

    render() {

        const { menu, maxHeight } = this.props;

        const menuProps = {
            className: prefix(CLASS_NAMES.GRID_ACTIONS.MENU.CONTAINER),
            style: {}
        };

        if (maxHeight !== undefined) {
            // to compensate for 10px padding on top and bottom
            // of menu
            // we adjust max height
            menuProps.style.maxHeight = (maxHeight - 20);
        }

        const items = getUniqueItems(menu);

        const menuItems = items && items.length > 0
            ? items.map(this.getMenuItem.bind(this))
            : null;

        return (
            <ul { ...menuProps }>
                { menuItems }
            </ul>
        );
    }

    static propTypes = {
        maxHeight: number,
        menu: array,
        metaData: object,
        stateKey: string,
        store: object
    };

    static defaultProps = {
        metaData: {}
    };

    getMenuItem(item) {

        const { metaData, stateKey, store } = this.props;

        if (!item.$$typeof) {
            const menuItemProps = {
                data: item,
                disabled: item.disabled,
                metaData,
                type: item.type,
                key: keyFromObject(item),
                stateKey,
                store
            };

            return <MenuItem { ...menuItemProps } />;
        }
        return item;
    }
}

export const getUniqueItems = (items) => {
    const keys = items.map((obj) => { return obj.key; });
    const unique = items.filter((ob, i) => {
        return keys.indexOf(ob.key) === i;
    });
    return unique;
};

function mapStateToProps() {
    return {};
}

const ConnectedMenu = connect(mapStateToProps)(Menu);

export { Menu, ConnectedMenu };
