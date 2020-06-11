import React from 'react';
import PropTypes from 'prop-types';
import Headers from '../../../components/headers';
import { Wrapper } from './styles';

function defaultLayout({ children }) {
  return (
    <Wrapper>
      <Headers />
      {children}
    </Wrapper>
  );
}

defaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default defaultLayout;
