import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import { Wrapper } from './styles';

function defaultLayout({ children }) {
  return (
        <Wrapper>
            <Header />
            {children}
        </Wrapper>)
    ;
}

defaultLayout.prototype = {
    children: PropTypes.element.isRequired,
}

export default defaultLayout;