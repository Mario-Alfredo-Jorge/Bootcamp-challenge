import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container } from './styles';

function authLayout({ children }) {
  return (
        <Wrapper>
            <Container>
                {children}
            </Container>
        </Wrapper>)
    ;
}

authLayout.prototype = {
    children: PropTypes.element.isRequired,
}

export default authLayout;