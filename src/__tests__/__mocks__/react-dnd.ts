import React from 'react';

module.exports = {
  useDrag: jest.fn((): any[] => [{}, React.createRef(), (): any => {}])
};
