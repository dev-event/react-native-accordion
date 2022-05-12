import React, { useState } from 'react';

const useLayout = defaultHeight => {
  const [layout, setLayout] = useState({
    height: defaultHeight || 0,
    width: 0,
    measured: false
  });
  const onLayout = React.useCallback(e => {
    const {
      height,
      width
    } = e.nativeEvent.layout;

    if (height === layout.height && width === layout.width) {
      return;
    }

    setLayout({
      height,
      width,
      measured: true
    });
  }, [layout.height, layout.width]);
  return [layout, onLayout];
};

export default useLayout;
//# sourceMappingURL=index.js.map